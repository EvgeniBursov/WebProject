"use strict";
const socket_io_1 = require("socket.io");
module.exports = (server) => {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected' + socket.id);
        socket.onAny((eventNames, args) => {
            console.log("on event" + eventNames);
            socket.emit('echo');
        });
    });
    return io;
};
//# sourceMappingURL=socket_server.js.map