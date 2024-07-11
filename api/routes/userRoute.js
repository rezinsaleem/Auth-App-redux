const express =  require('express');
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

router.get('/',test)
router.post("/update/:id", verifyToken, updateUser)

module.exports = router;