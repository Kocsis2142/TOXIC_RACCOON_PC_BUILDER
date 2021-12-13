const express = require('express')
const router = express.Router()

const deleteRaccoonBuildController = require('../controllers/deleteRaccoonBuildController')

router.post("/DELETERACCOONBUILD", deleteRaccoonBuildController.deleteRaccoonBuild);

module.exports = router