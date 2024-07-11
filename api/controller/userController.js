const User = require('../model/userModel.js');
const { errorHandler } = require('../utils/error.js');
const bcryptjs = require('bcryptjs') ;

const test = (req,res) =>{
  res.json({
    message: 'API is working!'
  })
}

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const {username, email, password, profilePicture } = req.body;

  // if (req.user.id !== userId) {
  //   return next(errorHandler(401, 'You can update only your account!'));
  // }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    if (password) {
      user.password = bcryptjs.hashSync(password, 10);
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }

    await user.save();

    const { password: omitPassword, ...rest } = user.dataValues;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  test,
  updateUser
}
