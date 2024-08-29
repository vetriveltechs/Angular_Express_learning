const glob = require("glob");
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.variables.env') });

const knex = require('knex')({
  client: 'mysql2', // or 'pg' for PostgreSQL
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }
});

global.knex = knex; // Attach Knex to the global object

module.exports = knex;

