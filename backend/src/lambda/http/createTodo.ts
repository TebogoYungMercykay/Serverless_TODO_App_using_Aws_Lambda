import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest';
import {createToDo} from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
{
    // TODO: Implement creating a new TODO item
    console.log("Creating a new TODO item: Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    // JSON object to createToDo
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const toDoItem = await createToDo(newTodo, split[1]);
    console.log("createToDo Done ..... Now returning the created Todo");
    return {
        statusCode: 201,
        headers:
        {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(
            {
                "item": toDoItem
            }
        ),
    }
};
