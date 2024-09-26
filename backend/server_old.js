// server.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 5001;

const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Endpoint to handle file upload
app.post('/api/upload-chart', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    // Call a function to process the file and get the analysis
    const analysis = await analyzeChart(filePath);
    res.json({ content: analysis });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});

// Function to process the uploaded chart
const analyzeChart = async (filePath) => {
  try {
    // Example: Using OpenAI API to analyze the chart
    // You can replace this with any other service you are using for analysis
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
        data: {
          prompt: `Analyze the chart from this image: ${filePath}`,
          n: 1,
          size: '1024x1024',
        },
      }
    );

    // Extract the analysis result
    const analysisResult = response.data.choices[0].text;
    return analysisResult;
  } catch (error) {
    console.error('Error analyzing chart:', error);
    throw new Error('Error analyzing chart');
  }
};

// Example endpoint to test the server
app.get('/api/test-openai', (req, res) => {
  res.json({ content: 'OpenAI API is working!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
