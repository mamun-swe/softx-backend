#### View specific approved book

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjFjNGQzYTAzM2VmNDFmYTc1MTA0MSIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwMjQ0NTM2LCJleHAiOjE2MDAzMzA5MzZ9
    .MQvTafbRGlI8sQN1BRLH4GlQPCtwDoRQdEb_TyTY_sY

Response Body: 
{
    "status": true,
    "response": {
        "_id": "5fcae686331e7d301d782317",
        "bookName": "Node.js test x",
        "author": "test author",
        "genre": "test gener",
        "releaseDate": "12.8.2020",
        "bookImage": "http://localhost:4000/uploads/books/1607196095326.jpg",
        "status": true
    }
}

Error: Token error