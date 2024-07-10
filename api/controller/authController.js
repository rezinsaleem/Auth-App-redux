const User = require("../model/userModel");
const bcryptjs  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error.js')


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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ where: { email } });
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser.toJSON();
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour

    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  signup,
  signin,
}