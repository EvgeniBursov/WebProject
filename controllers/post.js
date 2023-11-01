const Post = require('../models/post_model')

const getAllPosts = (req, res, next) => {
  res.send('get all posts')
};

const addNewPosts = async (req, res, next) => {
  console.log(req.body);

  const post = new Post({
    message: req.body.message,
    sender: req.body.sender
  })

  try {
    const newPost = await post.save();
    res.status(200).send({newPost})
  } catch (err) {
    res.status(400).send({'error': 'fail add DB'})
  }
}


module.exports = { getAllPosts, addNewPosts }