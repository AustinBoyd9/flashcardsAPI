const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

 

exports.handler = async (event) => {
    
    const record = await dynamo.scan({
        TableName: 'flashcards',
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
