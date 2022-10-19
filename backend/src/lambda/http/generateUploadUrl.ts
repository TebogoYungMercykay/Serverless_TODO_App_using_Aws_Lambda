import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createAttachmentPresignedUrl } from '../../businessLogic/ToDo'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('generateingURL');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Generating URL");
    const URL = await createAttachmentPresignedUrl(todoId);
    logger.info('Generated URL: ', {URL}, 'for user')
    return URL
  }
)

handler
    .use(httpErrorHandler())
    .use(
        cors({
        credentials: true
        })
    )