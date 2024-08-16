'use client';
import { Box, Button, Stack, TextField, Avatar, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function Home() {
  const { user, isLoaded } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setMessages([
        {
          role: 'assistant',
          content: `Welcome ${user?.firstName || "Guest"}! My name is AlgoBot, I am your dedicated assistant for all things Data Structures and Algorithms. Whether you're navigating your coursework or gearing up for a technical interview, I’m here to help you master these crucial concepts. Ask me anything about data structures or algorithms—how they work, where they’re used, or clarifying questions. Together, we’ll build a strong foundation and boost your confidence in DSA! What can I help you with today?`
        },
      ]);
    }
  }, [isLoaded, user]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to render HTML safely and trim trailing whitespace
  const renderMarkdown = (text) => {
    const htmlContent = marked(text).trim(); // Trim trailing whitespace
    return DOMPurify.sanitize(htmlContent);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#282c34' }}
    >
      <Stack
        direction={'column'}
        width="600px"
        height="800px"
        p={2}
        border="1px solid #8c9eff" // Muted blue for border
        spacing={3}
        sx={{ backgroundColor: '#1e1e1e', borderRadius: 2 }}
      >
       
        <Stack
          direction={'column'}
          spacing={3}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
              alignItems="center"
              spacing={1}
              sx={{ flexWrap: 'wrap', width: '90%' }} // Ensure messages wrap within the container
            >
              {message.role === 'assistant' && (
                <Avatar sx={{ marginRight: 1, bgcolor: '#8c9eff' }}> {/* Muted blue for avatar */}
                  B
                </Avatar>
              )}
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? '#8c9eff' // Muted blue for assistant messages
                    : '#0056b3' // Muted blue for user messages
                }
                color="#ffffff"
                fontFamily={'Arial, sans-serif'}
                letterSpacing=".8px"
                borderRadius={5}
                p={3}
                paddingLeft="5%"
                maxWidth="70%"
                sx={{
                  fontSize: '0.8rem',
                  overflowWrap: 'break-word', /* Ensure long words break onto the next line */
                  wordBreak: 'break-word', /* Break words if necessary */
                  whiteSpace: 'pre-wrap', /* Preserve whitespace and wrap text */
                  boxSizing: 'border-box', /* Include padding and border in the element's total width and height */
                }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
              />
            {message.role === 'user' && (
                <Avatar sx={{ marginLeft: 1,color: '#0056b3', bgcolor: 'white' }}> {/* Muted blue for avatar */}
                  {user?.firstName ? user.firstName.charAt(0) : "Y"}
                </Avatar>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#8c9eff', // Muted blue for border
                },
                '&:hover fieldset': {
                  borderColor: '#8c9eff', // Muted blue on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8c9eff', // Muted blue when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: '#8c9eff', // Muted blue for label
              },
              '& .MuiInputBase-input': {
                color: '#ffffff', // Set text color to white
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
            sx={{ 
              backgroundColor: '#8c9eff', // Muted blue for button
              color: '#ffffff', 
              '&:hover': { backgroundColor: '#6a7db3' } // Darker muted blue on hover
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}