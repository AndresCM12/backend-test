# Backend-test // version 1.0

This is a small test for my backend skills, using:
- NodeJS
- Express with Typescript
- Vanilla Javascript

Time spent: 2 days, aprox 8 hours of work.

## How to run
- Clone the repository
- Run `npm install`
- Run `npm run start`
- Go to `localhost:3000`
- Then use the crud inputs an buttons to test the API in the frontend or use Postman to test the API

## Endpoints
#### Get all tasks
```bash
GET http://localhost:3000/task
```
#### Get a task by id
```bash
GET http://localhost:3000/task/35
```
#### Create a task
Required body: 
```json
{
    "name": "Comer Discada",
    "elapsed_time": 10,
    "start_time": 6748594,
    "deleted": false,
    "project_id": 1
}
```
```bash
POST http://localhost:3000/task/create
```
#### Update a task
Required body: 
```json
{
    "id": 1,
    "name": "Comer Discada",
    "elapsed_time": 10,
    "start_time": 6748594,
    "deleted": false,
    "project_id": 1
}
```
```bash
PUT http://localhost:3000/task/update/40
```
#### Delete a task
```bash
DELETE http://localhost:3000/task/delete/2
```

### Author

- [Andres Chavez](https://andrescm12-mx.web.app/#work)
