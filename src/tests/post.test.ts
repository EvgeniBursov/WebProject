import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'


const newPost = "this is my new message"
const newSender = '999000'

beforeAll(async () =>{
    await Post.deleteMany()
})

afterAll(async () =>{
    await Post.deleteMany()
    mongoose.connection.close()
})

describe("Posts Tests", ()=>{
    test("get all post", async ()=>{
        const response = await request(app).get("/post") 
        expect(response.statusCode).toEqual(200)
    })

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

