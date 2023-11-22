import server from './server'
import io from './socket_server'
io(server)


server.listen(process.env.PORT, ()=>{
    console.log('Server run')
})

export = server 