const express = require('express')
const router = express.Router()

const saveCustomBuildController = require('../controllers/saveCustomBuildController')

router.post("/SAVEBUILD", saveCustomBuildController.saveCustomBuild);

module.exports = router