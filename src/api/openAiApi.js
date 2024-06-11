// src/api.js
const API_URL = 'http://localhost:5001/api';

export const testOpenAI = async () => {
  try {
    const response = await fetch(`${API_URL}/test-openai`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching OpenAI test data:', error);
    throw error;
  }
};
