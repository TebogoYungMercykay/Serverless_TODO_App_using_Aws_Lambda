// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '......';
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-fjp-3wf9.us.auth0.com',
  clientId: 'RzGQEDmJF4A5OznOSj7zIYBQ1zWTe1dT',
  callbackUrl: 'http://localhost:3000/callback'
};
