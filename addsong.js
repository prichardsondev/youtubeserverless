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

let write = function () {
  const params = {
    TableName: "Test",
    Item: {
      GENRE: "COUNTRY",
      ID: "mSgnC5eQ5u0",
    },
  };

  documentClient.put(params, function (err, data) {
    if (err) console.log(err);
    else console.log("success");
  });
};

write();
