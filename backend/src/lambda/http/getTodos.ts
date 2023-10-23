import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../businessLogic/ToDo'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('getTodods');

// TODO: Get all TODO items for a current user
export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        // Write your code here
        logger.info('User accessed todo items')
        const token = event.headers.Authorization.split(' ');
        const todos = await getTodosForUser(token[1]);
        console.log("Getting todo items");
        return todos
    }
)

handler
    .use(
        cors({
            credentials: true
        })
    )