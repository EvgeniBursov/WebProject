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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function sendError(res, error) {
    res.status(400).send({
        'err': error
    });
}
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
        return sendError(res, 'the email or password invalid');
    }
    try {
        const user = yield user_model_1.default.findOne({ 'email': email });
        if (user != null) {
            sendError(res, ' the user already regiser');
        }
    }
    catch (err) {
        sendError(res, err);
    }
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPwd = yield bcrypt_1.default.hash(password, salt);
        const registerUser = new user_model_1.default({
            'email': email,
            'password': encryptedPwd
        });
        const newUser = yield registerUser.save();
        res.status(200).send({ newUser });
    }
    catch (err) {
        sendError(res, 'waiting....');
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
        return sendError(res, 'the email or password invalid');
    }
    try {
        const user = yield user_model_1.default.findOne({ 'email': email });
        if (user == null) {
            return sendError(res, 'incorrect user or password');
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return sendError(res, "incorrect password");
        const accessToken = yield jsonwebtoken_1.default.sign({ 'id': user._id }, process.env.ACCESS_TOKEN_SECRET, { 'expiresIn': process.env.JWT_TOKEN_EXPIRATION });
        const refreshToken = yield jsonwebtoken_1.default.sign({ 'id': user._id }, process.env.REFRESH_TOKEN_SECRET);
        if (user.refresh_tokens == null)
            user.refresh_tokens = [refreshToken];
        else
            user.refresh_tokens.push(refreshToken);
        yield user.save();
        res.status(200).send({
            'message': 'login pass',
            'accessToken': accessToken,
            'refreshToken': refreshToken
        });
    }
    catch (err) {
        sendError(res, 'fail checking user');
    }
});
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (authHeader == null)
        return sendError(res, 'authentication missing');
    const refreshToken = authHeader && authHeader.split(' ')[1];
    if (refreshToken == null)
        return sendError(res, 'authentication missing');
    try {
        const user = yield jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userObject = yield user_model_1.default.findById(user._id);
        if (userObject == null)
            return sendError(res, 'fail valid token');
        if (!userObject.refresh_tokens.includes(refreshToken)) {
            userObject.refresh_tokens = [];
            yield userObject.save();
            return sendError(res, 'fail valid token');
        }
        const newAccessToken = yield jsonwebtoken_1.default.sign({ 'id': user._id }, process.env.ACCESS_TOKEN_SECRET, { 'expiresIn': process.env.JWT_TOKEN_EXPIRATION });
        const newRefreshToken = yield jsonwebtoken_1.default.sign({ 'id': user._id }, process.env.REFRESH_TOKEN_SECRET);
        userObject.refresh_tokens[userObject.refresh_tokens.indexOf(refreshToken)];
        yield userObject.save();
        return res.status(200).send({
            'accessToken': newAccessToken,
            'refreshToken': newRefreshToken
        });
    }
    catch (err) {
        return sendError(res, 'fail valid token');
    }
});
const authenticateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (authHeader == null)
        return sendError(res, 'authentication missing');
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return sendError(res, 'authentication missing');
    try {
        const user = yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = user._id;
        console.log("token user" + user);
        //await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //req.userId = user._id
        next();
    }
    catch (err) {
        return sendError(res, 'fail valid token');
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (authHeader == null)
        return sendError(res, 'authentication missing');
    const refreshToken = authHeader.split(' ')[1];
    if (refreshToken == null)
        return sendError(res, 'authentication missing');
    try {
        const user = yield jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userObject = yield user_model_1.default.findById(user._id);
        if (userObject == null)
            return sendError(res, 'fail valid token');
        if (!userObject.refresh_tokens.includes(refreshToken)) {
            userObject.refresh_tokens = [];
            yield userObject.save();
            return sendError(res, 'fail valid token');
        }
        userObject.refresh_tokens.splice(userObject.refresh_tokens.indexOf(refreshToken), 1);
        yield userObject.save();
        res.status(200).send();
    }
    catch (err) {
        res.status(400).send({ "error": "not implemented" });
    }
});
module.exports = { login, refresh, register, logout, authenticateMiddleware };
//# sourceMappingURL=auth.js.map