const RaccoonBuilds = require('../models/raccoonBuildsModel')
const errorCheckers = require("../errorCheckers")
const jwt = require('jsonwebtoken')
const checkThereIsNoError = require ("../checkThereIsNoError")

const saveRaccoonBuild = (req, res) => {
        const token = {
            JWT: req.body.JWT
            }
        const addElement = {
            
            BUILD_NAME: req.body.BUILD_NAME,
            USER_NAME: req.body.USER_NAME,
            USER_EMAIL: req.body.USER_EMAIL,
            BUILD_PRICE: req.body.BUILD_PRICE,
            BUILD_ID: req.body.BUILD_ID,
            COMPONENT_LIST: req.body.COMPONENT_LIST
            }

        let decodedJwt = jwt.verify(token.JWT, process.env.JWT_SECRET)
            if (decodedJwt.name === addElement.USER_NAME && decodedJwt.privilege === 'admin') {
                if (checkThereIsNoError(errorCheckers, addElement.COMPONENT_LIST)) {
                
                    RaccoonBuilds.create(addElement).then(() => console.log('New build saved!'))
            
                    res.send("Raccoon build saved!")
                } else {
                    res.send("Build save failed!")
            }
        } else {
            res.send("INVALID SAVE ATTEMPT!")
        }
    }

module.exports = {
    saveRaccoonBuild
}
