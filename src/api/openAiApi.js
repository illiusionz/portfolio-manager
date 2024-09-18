const API_URL = 'http://localhost:5003/api';

export const testOpenAI = async (message) => {
  try {
    console.log('Sending message to OpenAI API:', message);
    const response = await fetch(`${API_URL}/test-openai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error response from OpenAI API:', errorDetails);
      throw new Error(`Network response was not ok: ${errorDetails.error}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI API:', data);
    return data;
  } catch (error) {
    console.error('Error fetching OpenAI test data:', error);
    throw error;
  }
};

export const uploadChartForAnalysis = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('Uploading file to OpenAI API:', file);
    const response = await fetch(`${API_URL}/upload-chart`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error response from OpenAI API:', errorDetails);
      throw new Error(`Network response was not ok: ${errorDetails.error}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI API:', data);
    return data;
  } catch (error) {
    console.error('Error uploading chart:', error);
    throw error;
  }
};

export const uploadImageForAnalysis = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('Uploading file to OpenAI API:', file);
    const response = await fetch(`${API_URL}/upload-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error response from OpenAI API:', errorDetails);
      throw new Error(`Network response was not ok: ${errorDetails.error}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI API:', data);
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
