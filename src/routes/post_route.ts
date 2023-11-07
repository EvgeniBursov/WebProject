import express from 'express'
const router = express.Router()
import post from '../controllers/post'


router.get('/', post.getAllPosts)

router.get('/:id', post.getPostByID)

router.post('/', post.addNewPosts)

export = router