const express = require('express');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// Test OpenAI API connectivity
app.get('/api/test-openai', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello!' }],
    });
    console.log(response.choices[0].message);

    res.json(response.choices[0].message); // Removed .data
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
