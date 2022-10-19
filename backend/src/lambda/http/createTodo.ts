import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/ToDo'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo');

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const newTodo: CreateTodoRequest = JSON.parse(event.body);
        // TODO: Implement creating a new TODO item
        console.log("Creating new todo");
        const token = event.headers.Authorization.split(' ');
        const Item = await createTodo(newTodo, token[1]);
        logger.info('User created a todo')
        return Item
    }
)

handler
    .use(
        cors({
            credentials: true
        })
    )
