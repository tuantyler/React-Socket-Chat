import React from 'react'
import { io } from "socket.io-client";
import { useConversationsContext } from './ConversationsProvider';

const SocketContext = React.createContext()
export function useSocketContext() {
    return React.useContext(SocketContext)
}
export function SocketProvider({children}) {
    const {addMessage} = useConversationsContext()
    const socket = io("localhost:3000");

    socket.on("msg", data => {
        addMessage(data[0] , data[1], data[2])
        console.log("Socket Provider")
    });
    function sendMsg(msgObj){
        socket.emit("msg", msgObj);
    }

    return (
        <SocketContext.Provider value={{sendMsg}}>
            {children}
        </SocketContext.Provider>
    )
}
