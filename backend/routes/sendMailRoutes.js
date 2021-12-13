const express = require('express')
const router = express.Router()

const sendMailController = require('../controllers/sendMailController')

router.post("/SENDMAIL", sendMailController.sendMail);

module.exports = router