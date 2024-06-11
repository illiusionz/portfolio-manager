import React, { useState } from 'react';
import './ChatAgent.css';
import { testOpenAI } from '../../api/openAiApi';

const ChatAgent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const RATE_LIMIT_DELAY = 1000; // 1 second

  const handleSend = async () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastRequestTime < RATE_LIMIT_DELAY) {
      console.log('Please wait before making another request.');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending message:', input);
      const result = await testOpenAI();
      console.log('Received response:', result);
      setResponse(result.content);
      setLastRequestTime(currentTime);
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.message === 'Network response was not ok') {
        console.log('Too many requests, please wait and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className='chat-container'>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder='Type your message here...'
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      <div className='response'>{response}</div>
    </div>
  );
};

export default ChatAgent;
