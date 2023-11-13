import express from 'express'
const router = express.Router()
import auth from '../controllers/auth.js'


router.post('/login', auth.login)

router.post('/logout', auth.login)

router.get('/refresh', auth.refresh)


router.post('/register', auth.register)


export = router