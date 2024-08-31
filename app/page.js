'use client';
//ui imports
import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Stack, TextField, Button, Avatar, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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
      display="flex"
      height="100vh"
      width="100vw"
      bgcolor="background.default"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        maxWidth="600px"
        maxHeight="800px"
        borderRadius={2}
        boxShadow={3}
        overflow="hidden"
        sx={{ backgroundColor: '#1e1e1e' }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" borderBottom={1} borderColor="grey.800" p={2} bgcolor="grey.900">
          <Avatar sx={{ width: 40, height: 40, marginRight: 2, bgcolor: '#000000' }}>A</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="white">
             AlgoBot
            </Typography>
            <Typography variant="caption" color="grey.500">
              Live
            </Typography>
          </Box>
        </Box>

        {/* Chat Messages */}
        <Box flex={1} p={2} overflow="auto" sx={{ backgroundColor: '#1e1e1e' }}>
          {messages.map((message, index) => (
            <Grid container spacing={1} key={index} justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}>
              {message.role === 'assistant' && (
                <Grid item>
                  <Avatar sx={{ bgcolor: '#000000' }}>A</Avatar>
                </Grid>
              )}
              <Grid item>
                <Box
                  bgcolor={message.role === 'assistant' ? '#000000' : '#000000'}
                  color="white"
                  borderRadius={5}
                  p={2}
                  maxWidth="400px"
                  sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                />
              </Grid>
              {message.role === 'user' && (
                <Grid item>
                  <Avatar sx={{ bgcolor: '#000000' }}>
                    {user?.firstName ? user.firstName.charAt(0) : "Y"}
                  </Avatar>
                </Grid>
              )}
            </Grid>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Footer with input */}
        <Box p={2} borderTop={1} borderColor="grey.800" bgcolor="grey.900">
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ffffff' },
                    '&:hover fieldset': { borderColor: '#ffffff' },
                    '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                  },
                  input: { color: '#ffffff' },
                  '& .MuiInputLabel-root': { color: '#ffffff' },
                }}
              />
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                onClick={sendMessage}
                disabled={isLoading}
                sx={{ backgroundColor: '#ffffff', '&:hover': { backgroundColor: '#ffffff' } }}
              >
                {isLoading ? '...' : <SendIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}