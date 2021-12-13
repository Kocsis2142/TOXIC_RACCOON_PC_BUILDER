const express = require('express')
const router = express.Router()

const deleteCustomBuildController = require('../controllers/deleteCustomBuildController')

router.post("/DELETEBUILD", deleteCustomBuildController.deleteCustomBuild);

module.exports = router