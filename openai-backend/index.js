const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Test OpenAI API connectivity
app.post('/api/test-openai', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    console.log(response.data.choices[0].message);

    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error(
      'Error in /api/test-openai:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: 'An error occurred while testing OpenAI API connectivity.',
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Analyze Chart Data
app.post('/api/upload-chart', upload.single('file'), async (req, res) => {
  const file = req.file;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Analyze the following chart data:\n${file.path}`,
        },
      ],
    });
    console.log(response.data.choices[0].message);

    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error(
      'Error in /api/upload-chart:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: 'An error occurred while analyzing chart data.',
      details: error.response ? error.response.data : error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
