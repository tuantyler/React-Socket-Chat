const connectHost = "localhost"
// const connectHost = "192.168.1.16"
const server = require('http').createServer();
const io = require('socket.io')(server , {
    cors:true,
});
let activeUsers = []
io.on("connection", (socket) => {
    socket.on("msg" , data => {
        io.emit("msg" , data)
    })
    socket.on("sayHi" , data => {
        let array1 = [...new Set([...activeUsers , data])]
        JSON.stringify(array1) !== JSON.stringify(activeUsers) ? activeUsers.push(data) : "No diff"
        io.emit("sayHi", activeUsers)
        console.log("SayHi")
        console.log(activeUsers)
    })
    socket.on('beforeDisconnect' , data => {
        activeUsers = activeUsers.filter(u => u !== data)
        io.emit("sayHi", activeUsers)
        console.log("Before Disconnect")
        console.log(activeUsers)
    })
})
server.listen(3000, connectHost)

