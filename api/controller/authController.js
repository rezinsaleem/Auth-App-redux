const User = require("../model/userModel");
const bcryptjs  = require('bcryptjs');


const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword  = bcryptjs.hashSync(password, 10)
    const newUser = await User.create({ username, email, password:hashedPassword });
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error)
  }
}
module.exports = {
  signup,
}