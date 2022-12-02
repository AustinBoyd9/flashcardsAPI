const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

 

exports.handler = async (event) => {
    
    const userID = event.pathParameters.userID;
    
    const record = await dynamo.get({
        TableName: "users",
        Key: {
            ID: userID
        }
    }).promise();
    
    if (!record) {
        return {
            statusCode: 404,
            body: JSON.stringify({message: 'item not found for ID of ${userID}'})
        };
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(record.Item),
    };
    return response;
};