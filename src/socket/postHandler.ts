import {Server, Socket} from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import postController from "../controllers/post"

export = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
     socket:Socket<DefaultEventsMap,DefaultEventsMap,DefaultEventsMap>) => {

    const getAllPosts = (payload) => {
        const res = postController.getAllPostsEvent()
        socket.emit('post:get_all', res)
    }

    const getPostId = (payload) => {
        socket.emit('echo:echo', payload)
    }

    const addNewPosts = (payload) => {
        socket.emit('echo:echo', payload)
    }

    const reahHandler = (payload) => {
        //
    }

    socket.on("post:get_all", getAllPosts)
    socket.on("post:get_by_id", getPostId)
    socket.on("post:add_new", addNewPosts)
    socket.on("echoL:read", reahHandler)
}