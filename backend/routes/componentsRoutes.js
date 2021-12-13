const express = require('express')
const router = express.Router()

const componentsController = require('../controllers/componentsController')

router.get("/COMPONENTS", componentsController.components);

module.exports = router