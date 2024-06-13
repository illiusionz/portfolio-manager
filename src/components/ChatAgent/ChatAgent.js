import React, { useState } from 'react';
import './ChatAgent.css';
import {
  testOpenAI,
  uploadChartForAnalysis,
  uploadImageForAnalysis,
} from '../../api/openAiApi';

const ChatAgent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const RATE_LIMIT_DELAY = 1000; // 1 second
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastRequestTime < RATE_LIMIT_DELAY) {
      alert('Please wait a moment before making another request.');
      return;
    }

    setLoading(true);
    setMessages([...messages, { role: 'user', content: input }]);
    try {
      let result;
      if (file) {
        console.log('Uploading file:', file);
        if (fileType === 'image') {
          result = await uploadImageForAnalysis(file);
        } else {
          result = await uploadChartForAnalysis(file);
        }
      } else {
        console.log('Sending message:', input);
        result = await testOpenAI(input);
      }
      console.log('Received response:', result);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: result.content },
      ]);
      setResponse(result.content);
      setLastRequestTime(currentTime);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
      setFile(null); // Clear file after upload
      setInput(''); // Clear input field
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = [
      'text/csv',
      'application/json',
      'image/png',
      'image/jpeg',
    ];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert('Please upload a CSV, JSON, PNG, or JPEG file.');
      setFile(null);
      setFileType('');
    } else {
      setFile(selectedFile);
      setFileType(selectedFile.type.startsWith('image') ? 'image' : 'chart');
    }
  };

  return (
    <div className='chat-agent'>
      <div className='messages'>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className='input-container'>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Type your message here...'
          aria-label='Chat input'
        />
        <input
          type='file'
          className='file-upload'
          onChange={handleFileChange}
          aria-label='File upload'
        />
        <button
          onClick={handleSend}
          disabled={loading}
          aria-label='Send message'>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatAgent;
