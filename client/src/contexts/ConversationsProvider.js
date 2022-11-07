import React, { useEffect, useState, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid';
import { io } from "socket.io-client";
import { useBeforeunload } from 'react-beforeunload';

const ConversationsContext = React.createContext()
export function useConversationsContext(){
    return React.useContext(ConversationsContext)
}
const PUBLIC_CHAT_ID = "___publicchatsprototcol"
export default function ConversationsProvider({children , loginID}) {
    const [socket , setSocket] = useState(null)
    const [conversations, setConversations] = useLocalStorage("conversations" , [])
    const [activePublicChats , setActivePublicChats] = useLocalStorage("activePublicChat" , [])
    const [selectedConversationIndex , setSelectedConversationIndex] = useState(-1)
    const [currChatName, setCurrChatName] = useState("Public Chats")
    const [publicChats , setPublicChats] = useLocalStorage("publicchats" , [{conversationID: PUBLIC_CHAT_ID, conversationName: "Public Chat", recipients: [], messages: []}])
    let selectedConversation = []
    function createConversation(conversationName, recipients){
        setConversations(prevC => [...prevC , {conversationID: uuidv4(), conversationName, recipients, messages: []}])
    }
    const sayHI = useCallback(() => {
        if (socket !== null) {
            socket.emit("sayHi" , loginID)       
        }
    }, [loginID,socket])
    const readHI = useCallback(() => {
        socket.on("sayHi" , data => {
            setActivePublicChats(data)
        })
        return () => socket !== null && socket.off('sayHi')
    }, [socket,setActivePublicChats])
    useBeforeunload((event) => {
        if (socket !== null) {
            socket.emit("beforeDisconnect" , loginID)  
        }
    })
    const addMessage = useCallback((conversationID, sender, message, recipients) => {
        if (conversationID === PUBLIC_CHAT_ID) {
            const p_conversations = [...publicChats]
            let addTo = p_conversations.find(c => c.conversationID === conversationID)
            addTo.messages = [...addTo.messages , {sender, message}]
            setPublicChats(p_conversations)
        }
        else {
            const c_conversations = [...conversations]
            const addTo = conversations.find(c => c.conversationID === conversationID)
            console.log(addTo)
            if (!addTo) { 
                let adder = {conversationID: conversationID, conversationName: "", recipients: recipients, messages: [{sender, message}]}
                setConversations(prevC => [...prevC , adder]) 
            }
            else {
                addTo.messages = [...addTo.messages , {sender, message}]
                setConversations(c_conversations)
            }
        }
    }, [conversations,setConversations,setPublicChats,publicChats]);
    useEffect(() => {
        document.body.click()
        if(socket === null)
        {
            setSocket(io("localhost:3000"))
            //setSocket(io("http://192.168.1.16:3000"))
        }
        if (socket) {   
            sayHI()
            readHI()   
            socket.on("msg", data => {
                addMessage(data[0], data[1], data[2], data[3])
            })
        }
        return () => socket !== null && socket.off('msg')
    }, [socket,addMessage,loginID,readHI,sayHI]) 
    function sendMsg(msgObj){
        socket.emit("msg", msgObj);
    }
    const exportConversations = conversations.map((c,index) => index === selectedConversationIndex ? (selectedConversation = c, {...c, selected: true}) : {...c, selected: false})
    if (selectedConversationIndex === -1) {
        selectedConversation = publicChats[0]
    }
    return (
        
        <ConversationsContext.Provider value={{exportConversations , createConversation, setSelectedConversationIndex, selectedConversation, selectedConversationIndex, currChatName, setCurrChatName, sendMsg, activePublicChats}}>
            {children}
        </ConversationsContext.Provider>
    )
}
