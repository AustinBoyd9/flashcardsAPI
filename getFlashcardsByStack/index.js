const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

 

exports.handler = async (event) => {
  
    const params = {
      ExpressionAttributeNames: {
        "#F": "front",
        '#B': "back"
      },
      ExpressionAttributeValues: {
        ":s": event.pathParameters.stackID,
        ":p": true
      },
      FilterExpression:"stackID = :s AND isPublic = :p",
      ProjectionExpression: "#F, #B",
      TableName: "flashcards"
    };
    
    const record = await dynamo.scan(params, function(err,data){
      if (err) console.log(err, err.stack);
      else console.log(data);
    }).promise();
    
    if (!record) {
        return {
            statusCode: 404,
            body: JSON.stringify({message: 'item not found'})
        };
    }
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(record.Items),
    };
    return response;
};
