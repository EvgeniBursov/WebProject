import express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app)
import dotenv from 'dotenv'
dotenv.config()
import body_parser from 'body-parser'

app.use(body_parser.urlencoded({extended:true, limit: '1mb'}))
app.use(body_parser.json())

import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL) //,{ useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error=>{console.log(error)})
db.once('open',()=>{console.log('connected to mongo DB')})

import authRoute from './routes/auth_route.js'
app.use('/auth', authRoute)

import postRouter from './routes/post_route'
app.use('/post', postRouter)

import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

if (process.env.NODE_ENV == "development") {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Library API",
                version: "1.0.0",
                description: "A simple Express Library API",
            },
            servers: [{url: "http://localhost:3000",},],
        },
        //apis: ["./src/routes/*.ts"],
        apis: ["./dist/routes/*.js"],
    }
    const specs = swaggerJsDoc(options)
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
}

export = server