export = (io:any, socket:any) => {
    const echoHandler = (payload) => {
        socket.emit('echo', payload)
    }

    const reahHandler = (payload) => {
        //
    }

    socket.on("echo:echo", echoHandler)
    socket.on("echoL:read", reahHandler)
}