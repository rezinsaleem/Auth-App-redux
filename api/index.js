const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db'); 
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Check if sequelize is defined before using sync()
  if (sequelize) {
    sequelize.sync({ alter: true })
      .then(() => {
        console.log('Database connected and synced successfully.');
      })
      .catch(error => {
        console.error('Unable to connect to the database:', error);
      });
  } else {
    console.error('Sequelize is not properly initialized.');
  }
});