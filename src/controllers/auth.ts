import User from '../models/user_model'
import { NextFunction, Request,Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

function sendError(res:Response, error:string){
    res.status(400).send({
        'err': error
    })

}
const register = async (req:Request, res:Response) => {
    const email = req.body.email
    const password = req.body.password

    if(email == null || password == null) {
        return sendError(res, 'the email or password invalid')
    }

    try{
        const user = await User.findOne({'email': email})
        if(user != null){
            sendError(res, ' the user already regiser')
        }
    }catch(err){
        sendError(res,err)
    }

    try{
        const salt = await bcrypt.genSalt(10)
        const encryptedPwd = await bcrypt.hash(password,salt)
        const registerUser = new User({
            'email': email,
            'password': encryptedPwd
        })
        const newUser = await registerUser.save()
        res.status(200).send({newUser})
    }catch(err){
        sendError(res,'waiting....')
    }
}

const login = async (req:Request, res:Response) => {
    const email = req.body.email
    const password = req.body.password

    if(email == null || password == null) {
        return sendError(res, 'the email or password invalid')
    }

    try{
        const user = await User.findOne({'email': email})
        if(user == null){
            return sendError(res, 'incorrect user or password')
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match) return sendError(res, "incorrect password")
        
        const accessToken = await jwt.sign(
            { 'id': user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { 'expiresIn' : process.env.JWT_TOKEN_EXPIRATION}
        )
        
        res.status(200).send({
            'message':'login pass',
            'accessToken': accessToken
        })
    }catch(err){
        sendError(res,'fail checking user')
}
}

const authenticateMiddleware = async (req:Request, res:Response, next:NextFunction)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return sendError(res, 'authentication missing')
    
    try{
        /// const user = 
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //req.userId = user._id
        next()
    }catch(err){
        return sendError(res, 'fail valid token')
    }
}


const logout = async (req:Request, res:Response) => {

    res.status(400).send({"error":"not implemented"})
}

/*  try{
    const posts = await Post.find()
    res.status(200).send(posts)
  }catch(err){
    res.status(400).send({'error':'fail to get posts from DB'})
  }
}*/
/*
const addNewPosts = async (req:Request, res:Response)  => {
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

const getPostByID = async (req:Request, res:Response)  => {
  console.log(req.params.id)
  try{
    const posts = await Post.findById(req.params.id)
    res.status(200).send(posts)
  }catch(err){
    res.status(400).send({'error':'fail to get posts from DB'})
  }
}
*/
export = { login, register, logout, authenticateMiddleware}