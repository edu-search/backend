// connect postgres database and server
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "yaoyuan",
  host: "localhost",
  port: 5432,
  database: "edusearch",
});

module.exports = pool;
