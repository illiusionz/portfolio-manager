import React, { useState } from 'react';
import './ChatAgent.css';
import { testOpenAI, uploadChartForAnalysis } from '../../api/openAiApi';

const ChatAgent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const RATE_LIMIT_DELAY = 1000; // 1 second
  const [file, setFile] = useState(null);

  const handleSend = async () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastRequestTime < RATE_LIMIT_DELAY) {
      console.log('Please wait before making another request.');
      return;
    }

    setLoading(true);
    try {
      let result;
      if (file) {
        console.log('Uploading file:', file);
        result = await uploadChartForAnalysis(file);
      } else {
        console.log('Sending message:', input);
        result = await testOpenAI();
      }
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
      setFile(null); // Clear file after upload
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className='chat-agent'>
      <div className='messages'>
        <div className='message user'>Hello world</div>
        <div className='message bot'>Hello! How can I assist you today?</div>
        {/* Render response here */}
      </div>
      <div className='input-container'>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Type your message here...'
        />
        <input
          type='file'
          className='file-upload'
          onChange={handleFileChange}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        <div className='response'>{response}</div>
      </div>
    </div>
  );
};

export default ChatAgent;
