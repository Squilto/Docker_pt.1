const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import the Pool class from pg

const app = express();
app.use(cors());
app.use(express.json());

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER || 'your_user',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'dockerProj2',
  password: process.env.PGPASSWORD || 'your_password',
  port: process.env.PGPORT || 5432,
});

// Endpoint to register a new user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2)',
      [username, hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Endpoint to login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    const user = userResult.rows[0];
    if (user && await bcrypt.compare(password, user.password_hash)) {
      res.status(200).json({ message: 'Login successful', userId: user.id });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Endpoint to start a new game
app.post('/api/start-game', async (req, res) => {
  const { userId } = req.body;
  try {
    const gameResult = await pool.query(
      'INSERT INTO games (user_id, result) VALUES ($1, NULL) RETURNING id',
      [userId]
    );
    const gameId = gameResult.rows[0].id;
    res.status(201).json({ message: 'Game started', gameId });
  } catch (error) {
    res.status(500).json({ message: 'Error starting game', error });
  }
});

// Endpoint to record a move
app.post('/api/make-move', async (req, res) => {
  const { gameId, position, player } = req.body;
  try {
    await pool.query(
      'INSERT INTO moves (game_id, position, player) VALUES ($1, $2, $3)',
      [gameId, position, player]
    );
    res.status(201).json({ message: 'Move recorded' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording move', error });
  }
});

app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, score } = req.body;
  try {
    const result = await pool.query(
      'UPDATE students SET name = $1, score = $2 WHERE id = $3 RETURNING *',
      [name, score, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

