const express = require('express');
const bodyParser = require('body-parser');
const dynamodb = require('./aws/dynamoDB');

const app = express();
app.use(bodyParser.json());

// Example route to get data from DynamoDB
app.get('/api/data', async (req, res) => {
  const params = {
    TableName: 'your-table-name',
  };

  try {
    const data = await dynamodb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from DynamoDB' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
