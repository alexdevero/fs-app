# README

## Backend

Backend is run inside a docker container. To run the container, run the following command:

```bash
docker-compose up
```

When running the app for the first time, make sure to run MikroORM migrations. Npm script is available for this purpose:

```bash
docker-compose exec backend yarn run migration:up
```

## Database

Database is run inside a docker container. The container is started automatically when running the backend container.

## Frontend

Frontend is run using yarn or npm. To run the app, run the following command:

```bash
cd frontend
yarn dev
```
