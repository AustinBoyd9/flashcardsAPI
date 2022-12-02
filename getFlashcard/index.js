const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

 

exports.handler = async (event) => {

    const flashcardID = event.pathParameters.flashcardID;
    
    const record = await dynamo.get({
        TableName: 'flashcards',
        Key: {
            ID: flashcardID
        }
    }).promise();
    
    if (!record) {
        return {
            statusCode: 404,
            body: JSON.stringify({message: 'item not found for ID of ${flashcardID}'})
        };
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(record.Item),
    };
    return response;
};
