require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Neon
});

// Test the connection immediately
pool.connect()
  .then(() => console.log("PostgreSQL connected."))
  .catch((err) => console.error("Database connection error:", err));

pool.on("error", (err) => console.error("Database error:", err));

module.exports = pool;


