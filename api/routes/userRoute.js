const express =  require('express');
const { test } = require('../controller/userController.js');

const router = express.Router()

router.get('/',test)

module.exports = router;