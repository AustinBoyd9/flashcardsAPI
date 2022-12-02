const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // TODO implement
    
    const body = JSON.parse(event.body);
    console.log('the body passed as part of the create stack was: ', body);
    
    
    await dynamo.put({
        TableName: 'stacks',
        Item: {
            ...body,
            ID: Math.floor(Math.random()*100000).toString()
        }
    }).promise();
    
    
    const response = {
        statusCode: 201,
        body: JSON.stringify({message: 'Stack Created'}),
    };
    return response;
};
