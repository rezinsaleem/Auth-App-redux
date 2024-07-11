const express =  require('express');
const { test, updateUser, deleteUser } = require('../controller/userController.js') ;
const { verifyToken } =require('../utils/verifyUser.js');

const router = express.Router()

router.get('/',test)
router.post("/update/:id", verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;