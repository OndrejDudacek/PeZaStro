# System for managing customers - CRM - PeZaStro

This system is build for my father to help him manage his buisness and track customers, contacts, contracts and so on.

# Instalation

## Prerequisites
- Node and npm
- OPTIONAL - Postgresql

## List of steps
1. Download the repo on your pc.
2. Install dependencies using the `npm i` command in each folder (client, server).
3. Create a env file in root. You can use the [Env example](##env-example) below.
4. Run app in dev mode using `npm run dev` command in each folder (client, server).
5. If you want to use Postgresql, install it, start it, add db settings and pg to db type to env file.

## Env example

```ruby
# type of database - memory (default) or pg
DB_TYPE=local

# database settings
PG_HOST=localhost
PG_DB=test
PG_PORT=5432

# secret for jwt auth
JWT_SECRET=60Q-!LD6yH?Gmiji0
```
