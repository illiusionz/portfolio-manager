import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './ChatAgent.scss';
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
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedFile = event.dataTransfer.files[0];
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className='chat-agent' onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className='messages'>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className='input-container'>
        <label className='file-label' htmlFor='file-upload'>
          <FontAwesomeIcon icon={faPaperclip} className='file-upload-icon' />
          <input
            type='file'
            id='file-upload'
            onChange={handleFileChange}
            aria-label='File upload'
          />
        </label>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Type your message here...'
          aria-label='Chat input'
          rows='1'
        />
        <button
          onClick={handleSend}
          disabled={loading}
          aria-label='Send message'>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatAgent;
