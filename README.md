# Foodiepad

Simple shopping list built as example project to try this tech stack.

## Local development 

```bash
yarn # installs dependencies
yarn run prisma-migrate # generates the SQLite DB
yarn dev # runs the app in dev mode
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

The GraphQL API is at `http://localhost:3000/api/v1/graphql`

You can get a copy of the GraphQL schema at `http://localhost:3000/api/v1/schema`

## Docker

A Dockerfile is included, it will build the app and run it in production mode on port 3000.
