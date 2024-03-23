# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "reza1878",
  "password": "Rahasia",
  "name": "Reza Rizqi Ramdhani"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "reza1878",
    "name": "Reza Rizqi Ramdhani"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "reza1878",
  "password": "Rahasia"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "reza1878",
    "name": "Reza Rizqi Ramdhani",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password is wrong"
}
```

## Get User

Endpoint: GET /api/users/current

Headers:

- Authorization: token

Response Body (Success):

```json
{
  "data": {
    "username": "reza1878",
    "name": "Reza Rizqi Ramdhani"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint: PATCH /api/users/current

Headers:

- Authorization: token

Request Body:

```json
{
  "password": "Rahasia",
  "name": "Reza Rizqi Ramdhani"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "reza1878",
    "name": "Reza Rizqi Ramdhani"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username already registered"
}
```

## Logout User

Endpoint: DELETE /api/users/current

Headers:

- Authorization: token

Response Body (Success):

```json
{
  "data": true
}
```
