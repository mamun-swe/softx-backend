#### Update specific request status

```Request Header: 
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6IjVmNjFjNGQzYTAzM2VmNDFmYTc1MTA0MSIsIm5hbWUiOiJNYW11biIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjAwMjQ0NTM2LCJleHAiOjE2MDAzMzA5MzZ9
    .MQvTafbRGlI8sQN1BRLH4GlQPCtwDoRQdEb_TyTY_sY

Request Body:
{
    "id": "5fcae686331e7d301d782317",  //Request id
    "status": true/false
}


Response Body:
{
    status: true,
    message: 'Successfully request approved'
}

status code:
Success: 200

Error: Token error

 