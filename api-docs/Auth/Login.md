#### Login into account

```Request body: 
  {
    "email": "student@gmail.com",
    "password": "12345678"
  }

Response body: 
  {
    "status": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzkwZTdlYTljNTJlMzcwNTdhZGE1YyIsIm5hbWUiOiJTdHVkZW50Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MDc1MjI4NjYsImV4cCI6MTYwNzYwOTI2Nn0.rDw4TJSxKbO_7iG85ziYq9q2j1o8XxzgaYtAjtbSkkk"
  }

status code:
Success: 200

Error: 404
Response body: 
{
    "status": false,
    "message": "Invalid e-mail or password"
}