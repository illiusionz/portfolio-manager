const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1', // Update to your desired region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB();

const params = {
  TableName: 'UserWatchlist',
  KeySchema: [
    { AttributeName: 'userId', KeyType: 'HASH' }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamoDB.createTable(params, (err, data) => {
  if (err) {
    console.error(
      'Unable to create table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Created table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  }
});
