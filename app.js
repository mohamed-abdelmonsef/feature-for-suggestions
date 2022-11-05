const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
require('dotenv').config()

//Start of routes
require('./routes/auth.routes')(app)
require('./routes/fake.routes')(app)
require('./routes/home.routes')(app)
//End of routes

//Start of documentation
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./documentation/api.yaml')
app.use('/api-docs',swaggerUi.serve ,swaggerUi.setup(swaggerJsDocs))
//End of documentation

//START error handler
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({message:message})
})
//END error handler

//Database connection
require('./config/dbConnet').connect()
//the end of Database connection

const port = process.env.PORT || 3000
app.listen(port ,()=>{
    console.log(`server is working on port ${port}`);
})