const express = require('express')
const router = express.Router()

const raccoonBuildsController = require('../controllers/raccoonBuildsController')

router.get("/RACCOONBUILDS", raccoonBuildsController.raccoonBuilds);

module.exports = router