const express = require('express');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
