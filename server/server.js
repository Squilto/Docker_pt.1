const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import the Pool class from pg

const app = express();

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'root',
  host: 'postgres', // Container name in docker-compose
  database: process.env.POSTGRES_DB || 'docker_proj',
  password: process.env.POSTGRES_PASSWORD || 'example',
  port: 5432, // Default PostgreSQL port
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

app.use(cors());
app.use(express.json());

// Define example endpoint for PostgreSQL integration
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ message: 'Connected to PostgreSQL', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error querying PostgreSQL', error });
  }
});

const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
