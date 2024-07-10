const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db'); 
const userRoutes = require('./routes/userRoute.js')
const authRoutes = require('./routes/authRoute.js')
dotenv.config()

const app = express();

app.use(express.json());  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

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

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})