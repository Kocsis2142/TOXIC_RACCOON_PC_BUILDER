const CustomBuilds = require('../models/customBuildsModel')

const customBuilds = (req, res) => {
        CustomBuilds.find({}, function(err, data) {
            res.send(data)
        })
}

module.exports = {
    customBuilds
}