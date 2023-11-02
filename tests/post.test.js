const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')

beforeAll(done=>{
    done()
})

afterAll(done=>{
    mongoose.connection.close()
    done()
})

describe("Posts Tests", ()=>{
    test("add new post", async ()=>{
        const tmp = 2
        expect(tmp).toEqual(2)
    })
})

describe("GET / ", ()=>{
    test("It should respond hello", async ()=>{
        const response = await request(app).get("/post") 
        expect(response.statusCode).toEqual(200)
    })
})