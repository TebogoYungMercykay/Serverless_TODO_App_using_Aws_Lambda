import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {getAllToDo} from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
{
    console.log("Getting all TODO items for the current user: Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');

    const toDos = await getAllToDo(split[1]);
    console.log("getToDo Done ..... Now returning them");
    return {
        statusCode: 200,
        headers: 
        {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(
            {
                "items": toDos,
            }
        ),
    }
};
