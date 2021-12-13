const express = require('express')
const router = express.Router()

const customBuildsController = require('../controllers/customBuildsController')

router.get("/CUSTOMBUILDS", customBuildsController.customBuilds);

module.exports = router