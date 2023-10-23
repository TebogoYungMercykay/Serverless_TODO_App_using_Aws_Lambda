import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/ToDo'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Deleting todo");
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const token = event.headers.Authorization.split(' ');
    const deleteData = await deleteTodo(event.pathParameters.todoId, token[1]);
    logger.info('User deleted a todo item with id: ', {todoId})
    return deleteData
  }
)

handler
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    )