const jwt = require('jsonwebtoken')

const userToken = (req, res) => {
  if (!req.headers.jwt) res.send(401)
  try {
      jwt.verify(req.headers.jwt, process.env.JWT_SECRET);
      res.send({jwtIsValid: true})
  }
  catch {
      res.send({jwtIsValid: false})
    }
}

module.exports = {
  userToken
}