'use client'
import { Box, Button, Stack, TextField, Avatar } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { user, isLoaded } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // initialize messages once user data is loaded, so the 'welcome *name*' works properly
      setMessages([
        {
          role: 'assistant',
          content: `Welcome ${user?.firstName || "Guest"}! I’m your dedicated assistant for all things Data Structures and Algorithms (DSA). Whether you're navigating your coursework, gearing up for a technical interview, or brushing up on the material, I’m here to help you master these crucial concepts. Ask me anything about data structures or algorithms—how they work, where they’re used, or clarifying questions. Together, we’ll build a strong foundation and boost your confidence in DSA! What can I help you with today?`
        },
      ]);
    }
  }, [isLoaded, user]);
  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ])
    }
    
    setIsLoading(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
        
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
            >
              {message.role === 'assistant' && (
                <Avatar alt="Assistant" src="/path/to/assistant-icon.png" />
              )}

              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                letterSpacing=".5px"
                borderRadius={5}
                p={2.5}
                maxWidth="70%"
              >
                {message.content}
              </Box>
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
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}