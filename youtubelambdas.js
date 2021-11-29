//put song
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

exports.handler = async event => {
  
  const response = {
      statusCode: 0,
      body: "",
      headers: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*"
      }
  };

  const {GENRE, ID} = JSON.parse(event.body);
  
  let documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "yourTableName",
    Item: {
        GENRE,
        ID
    }
  };

  try {
    await documentClient.put(params).promise();
    
    response.body = JSON.stringify(params.Item);
    response.statusCode = 200;
    
  } catch (error) {
    response.body = JSON.stringify(error);
    response.statusCode = 400;
  }
  
  return response;
  
};

//get playlist
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  let {genre} = event.queryStringParameters;
  
  const response = {
      statusCode: 0,
      body: "",
      headers: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*"
      }
  };
  
  const params = {
    "TableName": "Test",
    "KeyConditionExpression": "#DYNOBASE_GENRE = :pkey",
    "ExpressionAttributeValues": {
      ":pkey": genre
    },
    "ExpressionAttributeNames": {
      "#DYNOBASE_GENRE": "GENRE"
    },
    "ScanIndexForward": true
  };
  
  try {
    let data = await documentClient.query(params).promise();
    let output = "http://www.youtube.com/watch_videos?video_ids=";
    data.Items.forEach((s, i) => (output += i === 0 ? `${s.ID}` : `,${s.ID}`));
    response.body = JSON.stringify(output);
    response.statusCode = 200;
  } catch (error) {

    
    response.body = JSON.stringify(error);
    response.statusCode = 400;
  }
  
  return response;
};