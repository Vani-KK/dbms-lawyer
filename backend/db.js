const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: "127.0.0.1",
  port : "3307",
  user: "root",
  password: "admin",
  database: "lawyer",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z", // 'Z' for UTC, or '+HH:MM' for specific timezone
});

module.exports = pool;
