import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import {updateToDo} from "../../businessLogic/ToDo"
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('UpdateToDo');

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const todoId = event.pathParameters.todoId
        const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
        logger.info('User updated todo item with id: ', {todoId})
        // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
        const token = event.headers.Authorization.split(' ');
        const toDoItem = await updateToDo(updatedTodo, todoId, token[1]);
        console.log("Updated todo item with id: ", {todoId});
        return toDoItem
    }
)

handler
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )