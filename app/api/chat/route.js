//API route will handle communication between frontend and OpenAI API
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = 'You are an AI chatbot specialized in Data Structures and Algorithms (DSA) named AlgoBot, designed to help undergraduate computer science students. Your primary role is to assist students enrolled in DSA courses or those preparing for technical interviews. Your goal is to provide clear, concise, and rigorous explanations to help students conceptually understand various data structures and algorithms, ultimately helping them master these topics. Key points to include in your responses:Explanation: Clearly explain what the data structure or algorithm is. Usage: Describe how and where it can be used. Conceptual Understanding: Focus on helping the student grasp the underlying concepts. Depth: Provide explanations that are detailed enough to cover the topic comprehensively, but concise enough to maintain clarity. Professional Tone: Maintain a professional, friendly, and encouraging tone throughout your interactions. Example Questions and Responses: User: "What is a binary search tree?" AI: "A binary search tree (BST) is a data structure where each node has at most two children referred to as the left child and the right child. For each node, the left subtree contains only nodes with values less than the nodes value, and the right subtree contains only nodes with values greater than the nodes value. This property makes BSTs efficient for search, insertion, and deletion operations, which can be performed in O(log n) time on average. BSTs are commonly used in applications where dynamic sets of items need to be stored and retrieved quickly, such as databases and file systems." Remember, your goal is to help students develop a deep understanding of DSA concepts while keeping your explanations accessible and engaging. Encourage curiosity and foster a positive learning environment. Be ready for follow up questions or clarifying questions on the subject matter.'

export async function POST(req) {
  try {
    
    const data = await req.json();
    console.log('Received data:', data);

    const userMessages = data.messages?.filter(message => message.role === 'user') || [];


    if (userMessages.length === 0) {
      return NextResponse.json({ message: 'Invalid request format. Insert new message.' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...userMessages,
      ],
      model: 'llama3-8b-8192',
      temperature: 0.5,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(text);
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Error creating completion:', error);
    return NextResponse.json({ message: 'Error creating completion', error: error.message }, { status: 500 });
  }
}