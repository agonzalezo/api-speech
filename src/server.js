/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
// Libs
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { hostname } from 'os'
import express from 'express'
import router from './routes/routes.js'
import morgan from 'morgan'
import cors from 'cors'

// dotenv.config()
const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:3001"],
  default: 'https:netsys.*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// region  Initialice functions
const app = express()

app.set('api_name', process.env.API_NAME)
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(morgan(process.env.API_LOG_LEVEL || 'short'))
app.use(cors(corsOptions))
app.use(router)

// code
app.listen(app.get('port'), () => {
  console.log(`api-${app.get('api_name')} started on http://${hostname}:${app.get('port')}`)
})