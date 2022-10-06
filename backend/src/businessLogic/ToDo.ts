import {TodoItem} from "../models/TodoItem";
import {parseUserId} from "../auth/utils";
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";
import {ToDoAccess} from "../dataLayer/ToDoAccess";

const uuidv4 = require('uuid/v4');
const toDoAccess = new ToDoAccess();

export async function getAllToDo(jwtToken: string): Promise<TodoItem[]>
{
    console.log("getAllToDo Loading from the TodoAccess Class  .....");
    return toDoAccess.getAllToDo(parseUserId(jwtToken));
}

export function generateUploadUrl(todoId: string): Promise<string>
{
    console.log("generateUploadUrl Loading from the TodoAccess Class .....");
    return toDoAccess.generateUploadUrl(todoId);
}

export function createToDo(createTodoRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem>
{
    console.log("createToDo Loading from the TodoAccess Class .....");
    // Returning a JSON type object for the ToDoAccess
    return toDoAccess.createToDo(
        {
            userId: parseUserId(jwtToken),
            todoId: uuidv4(),
            attachmentUrl:  `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${uuidv4()}`, 
            createdAt: new Date().getTime().toString(),
            done: false,
            ...createTodoRequest,
        }
    );
}

export function deleteToDo(todoId: string, jwtToken: string): Promise<string>
{
    console.log("deleteToDo Loading from the TodoAccess Class .....");
    return toDoAccess.deleteToDo(todoId, parseUserId(jwtToken));
}

export function updateToDo(updateTodoRequest: UpdateTodoRequest, todoId: string, jwtToken: string): Promise<TodoUpdate>
{
    console.log("updateToDo Loading from the TodoAccess Class .....");
    return toDoAccess.updateToDo(updateTodoRequest, todoId, parseUserId(jwtToken));
}

