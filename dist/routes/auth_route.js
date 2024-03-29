"use strict";
/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      schema: bearer
 *      bearerFormat: JWT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Authentication API
 */
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_js_1 = __importDefault(require("../controllers/auth.js"));
router.post('/login', auth_js_1.default.login);
router.post('/logout', auth_js_1.default.login);
router.get('/refresh', auth_js_1.default.refresh);
router.post('/register', auth_js_1.default.register);
module.exports = router;
//# sourceMappingURL=auth_route.js.map