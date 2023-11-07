import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT
import body_parser from 'body-parser'

app.use(body_parser.urlencoded({extended:true, limit: '1mb'}))
app.use(body_parser.json())

import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL) //,{ useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error=>{console.log(error)})
db.once('open',()=>{console.log('connected to mongo DB')})

app.use(express.static('public'))

import postRouter from './routes/post_route'
app.use('/post', postRouter)

export = app