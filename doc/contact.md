# Contact API Spec

## Create Contact

Endpoint: POST /api/contacts
Headers:

- Auhtorization: token

Request Body:

```json
{
  "first_name": "Reza",
  "last_name": "Rizqi",
  "email": "reza@example.com",
  "phone": "08212312312"
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "first_name": "Reza",
    "last_name": "Rizqi",
    "email": "reza@example.com",
    "phone": "08212312312"
  }
}
```

## Get Contact

Endpoint: GET /api/contacts/:contactId
Headers:

- Auhtorization: token

Response Body:

```json
{
  "data": {
    "id": 1,
    "first_name": "Reza",
    "last_name": "Rizqi",
    "email": "reza@example.com",
    "phone": "08212312312"
  }
}
```

## Update Contact

Endpoint: PUT /api/contacts/:contactId
Headers:

- Auhtorization: token

Request Body:

```json
{
  "first_name": "Reza",
  "last_name": "Rizqi",
  "email": "reza@example.com",
  "phone": "08212312312"
}
```

Response Body:

```json
{
  "data": {
    "id": 1,
    "first_name": "Reza",
    "last_name": "Rizqi",
    "email": "reza@example.com",
    "phone": "08212312312"
  }
}
```

## Remove Contact

Endpoint: DELETE /api/contacts/:contactId
Headers:

- Auhtorization: token

Response Body:

```json
{
  "data": true
}
```

## Search Contact

Endpoint: GET /api/contacts
Headers:

- Auhtorization: token

Query Params:

- name: string, contact frist name or contact last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Response Body:

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Reza",
      "last_name": "Rizqi",
      "email": "reza@example.com",
      "phone": "08212312312"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
