const RaccoonBuilds = require('../models/raccoonBuildsModel')
const jwt = require('jsonwebtoken')

const deleteRaccoonBuild = (req, res) => {
    const removeElement = {
        JWT: req.body.JWT,
        REMOVABLE_ID: req.body.REMOVABLE_ID
    }

    let decodedJwt = jwt.verify(removeElement.JWT, process.env.JWT_SECRET)
    
        RaccoonBuilds.findOne( {"BUILD_ID" : removeElement.REMOVABLE_ID}, function(err, result) {
            if (decodedJwt.name === result.USER_NAME) {
            try {
                RaccoonBuilds.deleteOne( { "BUILD_ID" : removeElement.REMOVABLE_ID } )
                .then(function(){
                    console.log("Custom build removed!");
                    RaccoonBuilds.find({}, function(err, data){
                        res.send(data);
                    })
                })
                .catch(function(error){
                    console.log(error);
                });
            } catch (e) {
                console.log(e);
                }
            }
      })
   
}

module.exports = {
    deleteRaccoonBuild
}