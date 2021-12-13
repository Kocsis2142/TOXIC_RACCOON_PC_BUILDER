const express = require("express")
const cors = require("cors")
const app = express()
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")

const userTokenRoutes = require('./routes/userTokenRoutes')
const loginRoutes = require('./routes/loginRoutes')
const componentsRoutes = require('./routes/componentsRoutes')
const customBuildsRoutes = require('./routes/customBuildsRoutes')
const raccoonBuildsRoutes = require('./routes/raccoonBuildsRoutes')
const saveCustomBuildRoutes = require('./routes/saveCustomBuildRoutes')
const saveRaccoonBuildRoutes = require('./routes/saveRaccoonBuildRoutes')
const deleteCustomBuildRoutes = require('./routes/deleteCustomBuildRoutes')
const deleteRaccoonBuildRoutes = require('./routes/deleteRaccoonBuildRoutes')
const sendMailRoutes = require('./routes/sendMailRoutes')

const swaggerDocument = YAML.load("./api/swagger/swagger.yaml")

const corsOptions = {
  origin:`http://localhost:3000`, 
  credentials:true,
  optionSuccessStatus:200
}

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api', userTokenRoutes)
app.use('/api', loginRoutes)
app.use('/api', componentsRoutes)
app.use('/api', customBuildsRoutes)
app.use('/api', raccoonBuildsRoutes)
app.use('/api', saveCustomBuildRoutes)
app.use('/api', saveRaccoonBuildRoutes)
app.use('/api', deleteCustomBuildRoutes)
app.use('/api', deleteRaccoonBuildRoutes)
app.use('/', sendMailRoutes)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app

