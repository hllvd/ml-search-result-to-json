# Ml-Fetcher

## Docker

To run docker you need to:
`cd containers`
`docker-compose up -d`

#### Connect to database from mysql-client

`mysql -u root -h 127.0.0.1 -P 3306 -p`

## Migrations

### Setup

- Set `src/db/data-source.ts` up
- Don't forget to set environment variable `MYSQL_PASSWORD` from **.env** file

### Manage migrations

- Generating migration named _product-catalog-init_ : `npm run typeorm:generate src/db/migrations/product-catalog-init`
- Apply migration: `npm run typeorm:migrate`

[Read more](https://orkhan.gitbook.io/typeorm/docs/migrations#generating-migrations)
