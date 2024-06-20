const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dynamoDB = require('./api/aws/dynamoDB');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.post('/api/watchlist', async (req, res) => {
  const { userId, symbols } = req.body;
  const params = {
    TableName: 'UserWatchlist',
    Item: {
      userId,
      symbols,
    },
  };
  try {
    await dynamoDB.put(params).promise();
    res.status(200).send('Watchlist saved');
  } catch (error) {
    res.status(500).send('Error saving watchlist');
  }
});

app.get('/api/watchlist/:userId', async (req, res) => {
  const { userId } = req.params;
  const params = {
    TableName: 'UserWatchlist',
    Key: { userId },
  };
  try {
    const result = await dynamoDB.get(params).promise();
    res.status(200).json(result.Item);
  } catch (error) {
    res.status(500).send('Error fetching watchlist');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
