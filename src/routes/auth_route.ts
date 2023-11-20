/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      schema: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Authentication API
 */

import express from 'express'
const router = express.Router()
import auth from '../controllers/auth.js'


router.post('/login', auth.login)

router.post('/logout', auth.login)

router.get('/refresh', auth.refresh)


router.post('/register', auth.register)


export = router