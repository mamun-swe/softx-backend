#### Logout from account

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzkwZTdlYTljNTJlMzcwNTdhZGE1YyIsIm5hbWUiOiJTdHVkZW50Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MDc1MjI4NjYsImV4cCI6MTYwNzYwOTI2Nn0.rDw4TJSxKbO_7iG85ziYq9q2j1o8XxzgaYtAjtbSkkk

Response body: 
  {
    "status": true,
    "message": "Successfully logged out"
  }

status code:
Success: 200

Error: 501
Response body: 
{
    "status": false,
    "message": "invalid signature"
}
