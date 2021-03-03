# Meal Planner

## Setup

Install [`nvm`(Node Version Manager)](https://github.com/nvm-sh/nvm).

Use version 15.x of Node.

```bash
$ nvm use 15
```

Install the sqlite CLI.

```bash
$ brew install sqlite
```

Install npm packages for app and server.

```bash
$ (cd app && npm install)
$ (cd server && npm install)
```

Set up the database and client.

```bash
$ cd server
$ npx prisma migrate dev --name init --preview-feature
$ npx prisma generate
```

Open a terminal and start the server.

```bash
$ cd server
$ npm start
```

Open another terminal and start the web app.

```bash
$ cd app
$ npm start
```

## Working with the database

The database is [SQLite](https://sqlite.org/index.html)
and uses [prisma](https://www.prisma.io/) to
manage the schema.

You can use the `sqlite3` CLI to interact with
the database.

```bash
$ cd server
$ sqlite3 prisma/dev.db
SQLite version 3.32.3 2020-06-18 14:16:19
Enter ".help" for usage hints.
# Show the schema
sqlite> .schema
# List the tables
sqlite> .tables
# To enable cascading deletes, set this
sqlite> PRAGMA foreign_keys = ON;
```

`prisma` also has a web UI that lets you interact
with the database. Open a new terminal.

```bash
$ cd server
$ npx prisma studio
```

## Working with the schema

To change the schema, follow these steps.

### `cd` into the `server` directory

The `prisma` CLI assumes by default there is
a `prisma/` directory, which is in `server/`.

```
$ cd server
```

### Modify `prisma/schema.prisma`

See the [docs on the schema model.](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model/)

### Create a schema migration with your changes

```bash
$ npx prisma migrate dev --name init --preview-feature
```

This will create a directory in `prisma/migrations` 
prefixed with a timestamp. Inside that directory will be
a `.sql` file with the schema migration commands.

The `prisma migrate` command also applies the migrations to the database.

See the [docs on schema migration.](https://www.prisma.io/docs/concepts/components/prisma-migrate)

### Regenerate the database client

After updating the schema you'll need to update
the client code used in the server to interact
with the database.

```bash
$ npx prisma generate
```

See [the docs on generating the client.](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)

### Format the schema file

After you're done making modifications to the schema file
it's a good idea to format it to keep the formatting consistent.

```bash
npx prisma format
```
