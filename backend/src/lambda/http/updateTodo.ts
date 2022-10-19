import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import {updateToDo} from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
{
    console.log("Update a TODO item with the provided id using values in the object: Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');

    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
    const toDoItem = await updateToDo(updatedTodo, event.pathParameters.todoId, split[1]);
    console.log("updateToDo Done ..... Now returning the updated Todo");
    return {
        statusCode: 200,
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
