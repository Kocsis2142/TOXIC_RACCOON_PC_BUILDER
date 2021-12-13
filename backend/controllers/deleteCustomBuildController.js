const CustomBuilds = require('../models/customBuildsModel')
const jwt = require('jsonwebtoken')

const deleteCustomBuild = (req, res) => {
    const removeElement = {
        JWT: req.body.JWT,
        REMOVABLE_ID: req.body.REMOVABLE_ID
    }

    let decodedJwt = jwt.verify(removeElement.JWT, process.env.JWT_SECRET)
    
        CustomBuilds.findOne( {"BUILD_ID" : removeElement.REMOVABLE_ID}, function(err, result) {
            if (decodedJwt.name === result.USER_NAME) {
            try {
                CustomBuilds.deleteOne( { "BUILD_ID" : removeElement.REMOVABLE_ID } )
                .then(function(){
                    console.log("Custom build removed!");
                    CustomBuilds.find({}, function(err, data){
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
    deleteCustomBuild
}