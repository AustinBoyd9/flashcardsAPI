const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // TODO implement
    
    const body = JSON.parse(event.body);
    console.log('the body passed as part of the create user was: ', body);
    const uuid = Math.floor(Math.random()*100000).toString();
    
    
    await dynamo.put({
        TableName: 'users',
        Item: {
            ...body,
            ID: uuid
        }
    }).promise();
    
    
    const response = {
        statusCode: 201,
        body: JSON.stringify({message: 'User #'+ uuid +' Created'}),
    };
    return response;
};
