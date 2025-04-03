require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

router.post("/login", async (req, res) => {
  if (!req.body?.username || !req.body?.password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const { username, password } = req.body;

  try {
    // Fetch user from database
    const { rows } = await pool.query(
      "SELECT * FROM tbl_users WHERE username = $1;",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = rows[0];
    
    // Direct password comparison (INSECURE - for testing only)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token });

  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;