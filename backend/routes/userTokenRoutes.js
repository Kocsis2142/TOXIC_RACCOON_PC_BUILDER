const express = require('express')
const router = express.Router()

const userTokenController = require('../controllers/userTokenController')

router.get("/userToken", userTokenController.userToken);

module.exports = router