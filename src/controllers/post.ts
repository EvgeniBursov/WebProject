import Post from '../models/post_model'

const getAllPosts = async (req, res) => {
  try{
    const posts = await Post.find()
    res.status(200).send(posts)
  }catch(err){
    res.status(400).send({'error':'fail to get posts from DB'})
  }
}

const addNewPosts = async (req, res) => {
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

const getPostByID = async (req, res) => {
  console.log(req.params.id)
  try{
    const posts = await Post.findById(req.params.id)
    res.status(200).send(posts)
  }catch(err){
    res.status(400).send({'error':'fail to get posts from DB'})
  }
}

export = { getAllPosts, addNewPosts, getPostByID}