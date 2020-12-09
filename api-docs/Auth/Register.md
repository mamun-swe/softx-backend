#### Create new account

```Request body: 
  {
    "name": "Student",
    "email": "student@gmail.com",
    "password": "12345678"
  }

Response body: 
  {
      "message": "Account successfully created"
  }

status code:
Success: 201

Error: 500 Internal Server Error
Response body: 
{
    "status": false,
    "message": [
        "Path `name` is required.",
        "Path `email` is required."
    ]
}