require("dotenv").config()
const express = require('express')
const cors = require('cors')
const route = require('./routes')
require("./connection")

const nutriNestServer = express()
nutriNestServer.use(cors())
nutriNestServer.use(express.json())
nutriNestServer.use(route)

const PORT = 4000 || process.env.PORT

nutriNestServer.listen(PORT, () => {
    console.log(`Server successfully running on : ${PORT}`);
})
