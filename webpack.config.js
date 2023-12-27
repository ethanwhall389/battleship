const path = require('path');

module.exports = {
  entry: './src/game-loop.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};