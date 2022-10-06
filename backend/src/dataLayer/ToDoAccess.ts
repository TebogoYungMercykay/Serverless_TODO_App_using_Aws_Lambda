import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Types } from 'aws-sdk/clients/s3';
import { TodoItem } from "../models/TodoItem";
import { TodoUpdate } from "../models/TodoUpdate";
const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

export class ToDoAccess
{
    constructor(private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),private readonly s3Client: Types = new XAWS.S3({signatureVersion: 'v4'}),private readonly todoTable = process.env.TODOS_TABLE,private readonly s3BucketName = process.env.S3_BUCKET_NAME)
    {
        // Creating a ToDoAccess object
    }
    // Member functions for the ToDoAccess class
    async createToDo(todoItem: TodoItem): Promise<TodoItem>
    {
        console.log("createToDo Loading from the ../http Classes .....");
        // JSON object for the ToDoAccess
        const params =
        {
            TableName: this.todoTable,
            Item: todoItem,
        };

        const result = await this.docClient.put(params).promise();

        console.log(result);
        console.log("createToDo Done ..... Now returning the created Todo");

        return todoItem as TodoItem;
    }

    async getAllToDo(userId: string): Promise<TodoItem[]>
    {
        console.log("getAllToDo  from the ../http Classes .....");
        // JSON object for the ToDoAccess
        const params =
        {
            TableName: this.todoTable,
            KeyConditionExpression: "#userId = :userId",
            ExpressionAttributeNames:
            {
                "#userId": "userId"
            },
            ExpressionAttributeValues:
            {
                ":userId": userId
            }

        };

        const result = await this.docClient.query(params).promise();

        console.log(result);
        console.log("getAllToDo Done ..... Now returning them");

        return result.Items as TodoItem[];
    }

    async updateToDo(todoUpdate: TodoUpdate, todoId: string, userId: string): Promise<TodoUpdate>
    {
        console.log("updateToDo Loading from the ../http Classes .....");
        // JSON object for the ToDoAccess
        const params = 
        {
            TableName: this.todoTable,
            Key:
            {
                "userId": userId,
                "todoId": todoId
            },
            UpdateExpression: "set #a = :a, #b = :b, #c = :c",
            ExpressionAttributeNames:
            {
                "#a": "name",
                "#b": "dueDate",
                "#c": "done"
            },
            ExpressionAttributeValues:
            {
                ":a": todoUpdate['name'],
                ":b": todoUpdate['dueDate'],
                ":c": todoUpdate['done']
            },
            ReturnValues: "ALL_NEW"
        };

        const result = await this.docClient.update(params).promise();

        console.log(result);
        console.log("updateToDo Done ..... Now returning the updated Todo");

        return result.Attributes as TodoUpdate;
    }

    async deleteToDo(todoId: string, userId: string): Promise<string>
    {
        console.log("deleteToDo Loading from the ../http Classes .....");
        // JSON object for the ToDoAccess
        const params = 
        {
            TableName: this.todoTable,
            Key: 
            {
                "userId": userId,
                "todoId": todoId
            },
        };

        const result = await this.docClient.delete(params).promise();
        
        console.log(result);
        console.log("deleteToDo Done ..... Successfully deleted the Todo");

        return "" as string;
    }

    async generateUploadUrl(todoId: string): Promise<string>
    {
        console.log("generateUploadUrl Loading from the ../http Classes .....");
        // JSON object for the ToDoAccess
        const url = this.s3Client.getSignedUrl('putObject',
            {
                Bucket: this.s3BucketName,
                Key: todoId,
                Expires: 1000,
            }
        );

        console.log(url);
        console.log("generateUploadUrl Done ..... Successfully generated the URL");

        return url as string;
    }
}
