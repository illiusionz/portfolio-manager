const express = require('express');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // This is also the default, can be omitted
});

// Set up AWS Rekognition client
const rekognition = new AWS.Rekognition({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Function to check if the query is asking for the time
const isTimeQuery = (message) => {
  const timeKeywords = ['what time is it', 'current time', 'time now'];
  return timeKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
};

// Test OpenAI API connectivity
app.post('/api/test-openai', async (req, res) => {
  const { message } = req.body;

  if (isTimeQuery(message)) {
    const currentTime = new Date().toLocaleTimeString();
    return res.json({
      role: 'assistant',
      content: `The current time is ${currentTime}`,
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    console.log(response.choices[0].message);

    res.json(response.choices[0].message);
  } catch (error) {
    console.error(
      'Error in /api/test-openai:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: 'An error occurred while testing OpenAI API connectivity.',
    });
  }
});

// Analyze Chart Data
app.post('/api/upload-chart', upload.single('file'), async (req, res) => {
  const file = req.file;

  try {
    const filePath = path.resolve(file.path);
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read the file content

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Analyze the following chart data:\n${fileContent}`,
        },
      ],
    });
    console.log(response.choices[0].message);

    res.json(response.choices[0].message);
  } catch (error) {
    console.error(
      'Error in /api/upload-chart:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: 'An error occurred while analyzing chart data.',
    });
  }
});

// Analyze Image using Amazon Rekognition
app.post('/api/upload-image', upload.single('file'), async (req, res) => {
  const file = req.file;

  try {
    const filePath = path.resolve(file.path);
    const fileBuffer = fs.readFileSync(filePath); // Read the file content as buffer

    const params = {
      Image: {
        Bytes: fileBuffer,
      },
    };

    rekognition.detectText(params, async (err, data) => {
      if (err) {
        console.error('Error in Rekognition detectText:', err);
        res.status(500).json({
          error:
            'An error occurred while analyzing image data with Rekognition.',
        });
      } else {
        const extractedText = data.TextDetections.map(
          (d) => d.DetectedText
        ).join('\n');

        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Analyze the following extracted text from the image:\n${extractedText}`,
            },
          ],
        });
        console.log(response.choices[0].message);

        res.json(response.choices[0].message);
      }
    });
  } catch (error) {
    console.error(
      'Error in /api/upload-image:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: 'An error occurred while analyzing image data.',
    });
  }
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
