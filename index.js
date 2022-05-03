require('dotenv').config()
const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const sequelize = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client/build', 'index.html')))
}

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()