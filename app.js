const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const body_parser = require('body-parser')

app.use(body_parser.urlencoded({extended:true, limit: '1mb'}))
app.use(body_parser.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error=>{console.log(error)})
db.once('open',()=>{console.log('connected to mongo DB')})


const postRouter = require('./WebProject/routes/post_route.js')

app.use('/post', postRouter)

app.get('/', (req,res)=> {
    res.send('hello')
})

app.listen(port, ()=>{
    console.log('Server run')
})
