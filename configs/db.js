const { Client } = require("pg");
const client = new Client({
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DB,
  host: process.env.PSQL_HOST,
  port: 5432,
});

module.exports = client;
