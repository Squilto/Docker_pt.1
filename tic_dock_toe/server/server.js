const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/docker_Proj', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define a Game model
const GameSchema = new mongoose.Schema({
  playerX: String,
  playerO: String,
  board: [String],
  turn: String,
});

const Game = mongoose.model('Game', GameSchema);

app.use(cors());
app.use(express.json());

let games = {}; // Store games in memory for now (or use a DB later)

// Create a new game
app.post('/api/game', (req, res) => {
  const gameId = Date.now(); // Simple unique ID for each game
  games[gameId] = {
    board: Array(9).fill(null),
    playerX: req.body.playerX,
    playerO: req.body.playerO,
    turn: 'X',
  };
  res.status(201).json({ gameId, message: 'Game created successfully' });
});

// Make a move
app.post('/api/game/:gameId/move', (req, res) => {
  const gameId = req.params.gameId;
  const { index, player } = req.body;

  if (!games[gameId]) {
    return res.status(404).json({ message: 'Game not found' });
  }

  const game = games[gameId];

  if (game.board[index] || game.turn !== player) {
    return res.status(400).json({ message: 'Invalid move' });
  }

  game.board[index] = player;
  game.turn = player === 'X' ? 'O' : 'X';

  res.status(200).json({ message: 'Move accepted', game });
});

// Get the game state
app.get('/api/game/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  if (!games[gameId]) {
    return res.status(404).json({ message: 'Game not found' });
  }

  res.status(200).json(games[gameId]);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});