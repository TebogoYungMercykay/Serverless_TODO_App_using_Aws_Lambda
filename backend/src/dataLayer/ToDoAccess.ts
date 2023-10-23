import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Types } from 'aws-sdk/clients/s3';
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
export class TodosAccess
{
    private readonly documentClient: DocumentClient;
    private readonly bucketClient: Types;
    private readonly todosTable: any;
    private readonly bucketName: any;
    constructor
    (
        documentClient = new XAWS.DynamoDB.DocumentClient(),
        bucketClient = new XAWS.S3({signatureVersion: 'v4'}),
        todosTable = process.env.TODOS_TABLE,
        bucketName = process.env.S3_BUCKET_NAME
    ){
       this.documentClient = documentClient;
       this.bucketClient = bucketClient;
       this.todosTable = todosTable;
       this.bucketName = bucketName;
    }

    async createToDo(todoItem: TodoItem): Promise<TodoItem>{
        console.log("Creating new todo");
        const params = { 
            todo_Table: this.todosTable, 
            Item: todoItem,
        };
        const result = await this.documentClient.put(params).promise();
        logger.info('User created a todo', {result})
        return todoItem as TodoItem;
    }

    async getAllToDo(userId: string): Promise<TodoItem[]>{
        console.log("Getting all todo");
        const user_declaration = "#userId = :userId";
        const user_name = "userId";
        const params = { 
            Todo_Table: this.todosTable,
            Declaration: user_declaration, 
            Name: { "#userId": user_name },
            User_Id: { ":userId": userId }
        };
        const result = await this.documentClient.query(params).promise();
        logger.info('User accessed todo items', {result})
        return result.Items as TodoItem[];
    }

    async updateToDo(todoUpdate: TodoUpdate, todoId: string, userId: string): Promise<TodoUpdate>{
        console.log("Updating todo");
        const user_declaration = "set #a = :a, #b = :b, #c = :c";
        const user_name = "Updated Todo";
        var update_request: string[];
        update_request = ["name","dueDate","done"];
        const params = {
            todo_Table: this.todosTable, 
            Key: { user_name: userId, "todoId": todoId }, 
            Declarations: user_declaration,
            Names: { "#a": update_request[0], "#b": update_request[1], "#c": update_request[2] },
            User_Id: { ":a": todoUpdate['name'], ":b": todoUpdate['dueDate'], ":c": todoUpdate['done'] },
            Values: user_name
        };
        const result = await this.documentClient.update(params).promise();
        logger.info('User updated todo items', {result})
        return result.Attributes as TodoUpdate;
    }

    async deleteToDo(todoId: string, userId: string): Promise<string>{
        console.log("Deleting todo");
        const user_Id = "userId";
        const todo_Id = "todoId";
        const params = {
            todo_Table: this.todosTable,
            Key: { user_Id: userId, todo_Id: todoId },
        };
        const result = await this.documentClient.delete(params).promise();
        logger.info('User deleted a todo item', {result})
        return "" as string;
    }

    async generateUploadUrl(todoId: string): Promise<string>{
        console.log("Generating URL");
        const url = this.bucketClient.getSignedUrl('putObject',{ Bucket: this.bucketName, Key: todoId, Expires: 1000, });
        logger.info('User uploaded data to todo item: ', {todoId})
        return url as string;
    }
}
