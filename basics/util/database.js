const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "node-complete",
  password: "root",
  port: 5432 // Default PostgreSQL port
})

module.exports = pool
