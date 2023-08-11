/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
// #region  Imports
import express from 'express'
import os from 'os'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import getAudio from '../controller/mediaHandler.js'
dotenv.config()

// #region Vars/Const
const router = express.Router()
const API_NAME = process.env.API_NAME

// #region Routes
router.post(`/api/${API_NAME}/text2speech`, getAudio)

router.get(`/api/${API_NAME}/ping`, (req, res) => {
    console.log(`${req.ip} do a ping!..`)
    res.status(200).json({ name: os.hostname(), message: 'Server is working.', arch: os.arch(), memory: os.totalmem(), uptime: os.uptime(), load: os.loadavg(), cpu: os.cpus() })
})

router.all('*', (req, res) => {
    res.status(404).json({ message: 'I Dont have that.' })
})

export default router
