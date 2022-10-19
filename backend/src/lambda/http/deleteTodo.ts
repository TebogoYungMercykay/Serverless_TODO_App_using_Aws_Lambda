import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {deleteToDo} from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
{
    console.log("Removing a TODO item by id: Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');

    const deleteData = await deleteToDo(event.pathParameters.todoId, split[1]);
    console.log("deleteToDo Done ..... Successfully deleted the Todo");
    return {
        statusCode: 200,
        headers: 
        {
            "Access-Control-Allow-Origin": "*",
        },
        body: deleteData,
    }
};
