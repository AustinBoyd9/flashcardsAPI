const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // TODO implement
    
    const body = JSON.parse(event.body);
    console.log('the body passed as part of the create user was: ', body);
    const userID = event.queryStringParameters.userID.toString();
    const password = event.queryStringParameters.password.toString();
    
    const record = await dynamo.get({
        TableName: 'users',
        Key: {
            ID: userID
        }
    }).promise();
    
    if (!(record.Item.password == event.queryStringParameters.password)) { 
        const response = {
            statusCode: 403,
            body: JSON.stringify({message: 'Unauthorized'})
        };
        return response;
    }
        await dynamo.put({
            TableName: 'flashcards',
            Item: {
                ...body,
                ID: Math.floor(Math.random()*100000).toString(),
                createdBy: userID
            }
        }).promise();
        
        
        const response = {
            statusCode: 201,
            body: JSON.stringify({message: 'Card Created by '+ record.Item.name + ' (ID #' + userID + ').'})
        };
    return response;
};

