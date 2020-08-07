# SPORT-APPS

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /club`

### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​https://github.com/Group-Project-W5-Group1/sport-application.git

```json
{
    "id": 2,
    "email": "kita@gmail.com",
    "password": "$2b$10$zowFozhFsSF5CipwP0GVUOe8V.vaUPr0Nfo9MlpipeDH73efO90yS",
    "updatedAt": "2020-08-06T13:06:29.677Z",
    "createdAt": "2020-08-06T13:06:29.677Z"
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "user": {
        "id": 2,
        "email": "kita@gmail.com",
        "password": "$2b$10$zowFozhFsSF5CipwP0GVUOe8V.vaUPr0Nfo9MlpipeDH73efO90yS",
        "createdAt": "2020-08-06T13:06:29.677Z",
        "updatedAt": "2020-08-06T13:06:29.677Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraXRhQGdtYWlsLmNvbSIsImlhdCI6MTU5NjcxOTIxM30.hUshO6cw2nlcO-VnYM_YB2ArTTMVffg42vHIhjBz58k"
}
```