const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Game = require('./models/Game'); // Import the Game model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://root:example@mongo:27017/docker_Proj', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.use(cors());
app.use(express.json());

// Create a new game
app.post('/api/game', async (req, res) => {
  try {
    const { playerX, playerO } = req.body;
    const newGame = new Game({ playerX, playerO });
    const savedGame = await newGame.save();
    res.status(201).json({ gameId: savedGame._id, message: 'Game created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating game', error });
  }
});

// Make a move
app.post('/api/game/:gameId/move', async (req, res) => {
  const gameId = req.params.gameId;
  const { index, player } = req.body;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.board[index] || game.turn !== player) {
      return res.status(400).json({ message: 'Invalid move' });
    }

    // Update the board and switch turns
    game.board[index] = player;
    game.turn = player === 'X' ? 'O' : 'X';

    const updatedGame = await game.save();
    res.status(200).json({ message: 'Move accepted', game: updatedGame });
  } catch (error) {
    res.status(500).json({ message: 'Error making move', error });
  }
});

// Get the game state
app.get('/api/game/:gameId', async (req, res) => {
  const gameId = req.params.gameId;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving game', error });
  }
});

const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
