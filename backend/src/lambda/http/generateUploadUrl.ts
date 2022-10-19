import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import {generateUploadUrl} from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Creating n a presigned URL to upload a file for a TODO item with the provided id: Processing Event ", event);
    const todoId = event.pathParameters.todoId;

    const URL = await generateUploadUrl(todoId);
    console.log("generateUploadUrl Done ..... Successfully generated the URL");
    return {
        statusCode: 202,
        headers:
        {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(
            {
                uploadUrl: URL,
            }
        )
    };
};