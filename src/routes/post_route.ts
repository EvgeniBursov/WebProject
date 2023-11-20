/**
 * @swagger
 * tags:
 *  name: Post
 *  description: The Post API
 */

import express from 'express'
const router = express.Router()
import post from '../controllers/post'
import auth from '../controllers/auth'

router.get('/', auth.authenticateMiddleware, post.getAllPosts)

router.get('/', post.getAllPosts)

router.get('/:id', post.getPostByID)

router.post('/', post.addNewPosts)

export = router