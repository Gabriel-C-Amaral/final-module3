import express from 'express'
import dotenv from 'dotenv'
import { MongoConnection } from './database/mongo-connect'
import { routes } from './routes/routes'


dotenv.config()
MongoConnection.initialize()

const app = express()
app.use(express.json())

app.use(express.static("www"))


//rota
app.use(routes)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))