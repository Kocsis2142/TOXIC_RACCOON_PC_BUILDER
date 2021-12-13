const RaccoonBuilds = require('../models/raccoonBuildsModel')

const raccoonBuilds = (req, res) => {
        RaccoonBuilds.find({}, function(err, data) {
            res.send(data)
        })
}

module.exports = {
    raccoonBuilds
}