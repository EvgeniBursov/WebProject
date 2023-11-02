const express = require('express')
const router = express.Router()
const post = require('../controllers/post.js')


router.get('/', post.getAllPosts)

router.get('/:id', post.getPostByID)

router.post('/', post.addNewPosts)

module.exports = router