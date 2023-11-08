"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user_model"));
const userEmail = "testUser@gmail.com";
const userPassword = "12345";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //await User.deleteMany()
    console.log("BEFORE");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteMany();
    mongoose_1.default.connection.close();
}));
describe("Auth Tests", () => {
    test("Register test", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/auth/register").send({
            "email": userEmail,
            "password": userPassword
        });
        expect(response.statusCode).toEqual(200);
    }));
    test("Login test", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/auth/login").send({
            "email": userEmail,
            "password": userPassword
        });
        expect(response.statusCode).toEqual(200);
    }));
});
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
//# sourceMappingURL=auth.test.js.map