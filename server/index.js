import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import models from './models/models.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import ErrorHandler from './middleware/ErrorHandlingMiddleware.js'
import path from 'path'

const PORT = Number(process.env.PORT) || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve('static')))
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок, последний Middleware
app.use(ErrorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
