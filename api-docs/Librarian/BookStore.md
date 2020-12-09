#### Store Book

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjFjNGQzYTAzM2VmNDFmYTc1MTA0MSIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwMjQ0NTM2LCJleHAiOjE2MDAzMzA5MzZ9
    .MQvTafbRGlI8sQN1BRLH4GlQPCtwDoRQdEb_TyTY_sY

Request Body:
{ 
    "bookName": "test bookName",
    "author": "test author",
    "genre": "test genre",
    "releaseDate": "10.10.2020",
    "bookImage" "test.jpg"
}

Response Body:
{
    "status": true,
    "message": "Successfully new book uploaded"
}

status code:
Success: 200

Error: Token error