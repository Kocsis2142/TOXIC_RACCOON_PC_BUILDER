const Components = require('../models/componentsModel')

const components = (req, res) => {
        Components.find({}, function(err, data) {
            res.send(data[0])
        })
}

module.exports = {
    components
}