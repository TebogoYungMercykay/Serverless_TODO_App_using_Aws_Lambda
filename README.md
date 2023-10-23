In this project you will develop and deploy a simple "TODO" application using AWS Lambda and Serverless framework. This application will allow users to create/remove/update/get TODO items. Each TODO item contains the following fields: todoId (string) - a unique id for an item, createdAt (string) - date and time when an item was created, name (string) - name of a TODO item (e.g. "Change a light bulb"), dueDate (string) - date and time by which an item should be completed, done (boolean) - true if an item was completed, false otherwise, attachmentUrl (string) (optional) - a URL pointing to an image attached to a TODO item, You might also store an id of a user who created a TODO item. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

# final-project
 create serverless application for alx-t udacity cloud developer course
Getting Started

JSON Web Key Set: https://dev-Something.us.auth0.com/.well-known/jwks.json

npm install -g serverless

serverless --version

serverless login

rm -rf node_modules (deleting node_modules)

sls config credentials --provider aws --key Access_ID --secret Access_Key --profile serverless -o

Deploy Backend
        cd backend
        
        export NODE_OPTIONS=--openssl-legacy-provider (For latest node users)
        npm install

        npm install --save-dev serverless-iam-roles-per-function@next 
        
        npm audit fix

        serverless

        serverless deploy --verbose
        
        sls deploy -v --aws-profile serverless (For permissions error)
        
        npm i typescript@4.6.4 (typescript erros)
        
Deploy Frontend
        cd client
        
        npm install

        npm install --save-dev
        
        npm run start
        
The client folder contains a web application that can use the API that should be developed in the project.

Edit the config.ts file in the client folder under the src sub folder:

            const apiId = '...' API Gateway id
            export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

            export const authConfig = {
               domain: '...',    // Domain from Auth0
               clientId: '...',  // Client id from an Auth0 application
               callbackUrl: 'http://localhost:3000/callback'
            }
