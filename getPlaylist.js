var AWS = require("aws-sdk");

const credentials = new AWS.SharedIniFileCredentials({
  profile: "default",
});
AWS.config.credentials = credentials;
AWS.config.update({
  region: "us-east-1",
  endpoint: "http://dynamodb.us-east-1.amazonaws.com",
});

let documentClient = new AWS.DynamoDB.DocumentClient();

let read = function () {
  const params = {
    "TableName": "Test",
    "KeyConditionExpression": "#DYNOBASE_GENRE = :pkey",
    "ExpressionAttributeValues": {
      ":pkey": "COUNTRY"
    },
    "ExpressionAttributeNames": {
      "#DYNOBASE_GENRE": "GENRE"
    },
    "ScanIndexForward": true,
    "Limit": 100
  }

  documentClient.query(params, function (err, data) {
    if (err) console.log(err);
    else {
        //console.log("success " + JSON.stringify(data));
        console.log(data);
}
  });
};

read();


