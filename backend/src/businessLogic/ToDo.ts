import { TodoItem } from '../models/TodoItem'
import { TodosAccess } from '../dataLayer/ToDoAccess'
import { TodoUpdate } from "../models/TodoUpdate";
// import { AttachmentUtils } from './attachmentUtils';
import {parseUserId} from "../auth/utils";
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { createLogger } from '../utils/logger'
import { v4 as uuidv4 } from 'uuid';
import * as createError from 'http-errors'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

// TODO: Implement businessLogic
const logger = createLogger('ToDo');

const toDoAccess = new TodosAccess();

export async function getAllToDo(jwtToken: string): Promise<TodoItem[]>
{
    console.log("Getting all todo");
    logger.info('User accessed todo items')
    return toDoAccess.getAllToDo(parseUserId(jwtToken));
}

export function generateUploadUrl(todoId: string): Promise<string>
{
    console.log("Generating URL");
    logger.info('User uploaded data to todo item: ', {todoId})
    return toDoAccess.generateUploadUrl(todoId);
}

export function createToDo(createTodoRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem>
{
    console.log("Creating new todo");
    logger.info('User created a todo')
    return toDoAccess.createToDo(
        {
            userId: parseUserId(jwtToken),
            todoId: uuidv4(),
            createdAt: new Date().getTime().toString(),
            ...createTodoRequest,
            done: true,
            attachmentUrl:  `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${uuidv4()}`, 
        }
    );
}

export function deleteToDo(todoId: string, jwtToken: string): Promise<string>
{
    console.log("Deleting todo");
    logger.info('User deleted a todo item with id: ', {todoId})
    return toDoAccess.deleteToDo(
        todoId,
        parseUserId(jwtToken)
    );
}

export function updateToDo(updateTodoRequest: UpdateTodoRequest, todoId: string, jwtToken: string): Promise<TodoUpdate>
{
    logger.info('User updated todo item with id: ', {todoId})
    return toDoAccess.updateToDo(
        updateTodoRequest,
        todoId, 
        parseUserId(jwtToken)
    );
}
