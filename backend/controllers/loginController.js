const GoogleAccount = require('../models/googleAccountsModel')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const login = (req, resp) => {

  let authCode = req.body.authCode

  axios
  .post(`https://oauth2.googleapis.com/token`, {
    code: authCode,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code"
  })
  .then(res => {
    axios
    .get(`https://oauth2.googleapis.com/tokeninfo?id_token=${res.data.id_token}`)
    .then(userData => {
      let userInfo = userData.data
      GoogleAccount.find({sub: userInfo.sub}, function(err, result) {
        if (err) {
          console.log(err)
        } else {
              if (result.length) {
                let token = jwt.sign({ sub: result[0].sub, name: result[0].name, email: result[0].email, locale: result[0].locale, picture: result[0].picture, privilege: result[0].privilege }, process.env.JWT_SECRET, { expiresIn: '1h' });
                resp.send({userValidated: true, msg: "Successfully logged in!", jwt: token})
              }
              else {
                let user = GoogleAccount ({sub: userInfo.sub, name: userInfo.name, email: userInfo.email, locale: userInfo.locale, picture: userInfo.picture, privilege: "user"})
                user.save(function(err, doc) {
                  if (err) return console.error(err);
                  else {
                    let token = jwt.sign({ sub: doc.sub, name: doc.name, email: doc.email, locale: doc.locale, picture: doc.picture, privilege: doc.privilege }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    resp.send({userValidated: true, msg: "Successfully logged in!", jwt: token})
                  }
                })
              }
          }
      })
    })
      .catch(error => {
      console.error(error)
    })
  })
  .catch(error => {})  
}

module.exports = {
    login
}