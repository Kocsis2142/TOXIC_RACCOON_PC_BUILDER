const express = require('express')
const router = express.Router()

const saveRaccoonBuildController = require('../controllers/saveRaccoonBuildController')

router.post("/SAVERACCOONBUILD", saveRaccoonBuildController.saveRaccoonBuild);

module.exports = router