## Migrations

### Setup

- Set `src/db/data-source.ts` up
- Don't forget to set environment variable `MYSQL_PASSWORD` from **.env** file

### Manage migrations

- Generating migration named _product-catalog-init_ : `npm run typeorm:generate src/db/migrations/product-catalog-init`
- Apply migration: `npm run typeorm:migrate`

# ml-search-result-to-json
