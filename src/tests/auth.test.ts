import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import User from '../models/user_model'

const userEmail = "testUser@gmail.com"
const userPassword = "12345"

beforeAll(async () =>{
    //await User.deleteMany()
    console.log("BEFORE")
})

afterAll(async () =>{
    await User.deleteMany()
    mongoose.connection.close()
})


describe("Auth Tests", ()=>{
    test("Register test", async ()=>{
        const response = await request(app).post("/auth/register").send({
            "email": userEmail,
            "password": userPassword
        })
        expect(response.statusCode).toEqual(200)
    })

    test("Login test", async ()=>{
        const response = await request(app).post("/auth/login").send({
            "email": userEmail,
            "password": userPassword
        })
        expect(response.statusCode).toEqual(200)
        const accessToken = response.body.accessToken
        expect(accessToken).not.toBeNull()
        const refreshToken = response.body.refreshToken
        expect(refreshToken).not.toBeNull()

        //response = await request(app).get('/post').set('Authorization','JWT', + accessToken)
        //expect(response.statusCode).toEqual(200)
    })
})
/*
    test("add new test", async ()=>{
        const response = await request(app).post('/post').send({
            "message": newPost,
            "sender": newSender
    }) 
    expect(response.statusCode).toEqual(200)
    expect(response.body.newPost.sender).toEqual(newSender)
    })

    test("get all post containing given text in post massages", async ()=>{
        const response = await request(app).get('/post?message=new')
        expect(response.statusCode).toEqual(200)
        expect(response.body.newPost.sender).toEqual(newSender)
    })
})
*/
