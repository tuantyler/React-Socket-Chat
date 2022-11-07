import React, { useRef, useEffect } from 'react'
import { useConversationsContext } from './contexts/ConversationsProvider'
import { Button, InputGroup, Form, Alert } from 'react-bootstrap'
import { useContactContext } from './contexts/ContactProvider'

export default function OpenConversation({loginID}) {
    const { selectedConversation,currChatName, sendMsg} = useConversationsContext()
    const { contacts } = useContactContext()
    let divRef = useRef(null)
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [(selectedConversation.messages !== null ? [] : selectedConversation.messages)]);
    const txtMessage = useRef()
    const conversationIsOpen = selectedConversation.messages ? true : false
    return (
        <>  
            <Alert variant='dark'>{currChatName}</Alert>
            <div className="chat_messages p-3 mb-2 d-flex flex-column overflow-auto"> 
            {conversationIsOpen && selectedConversation.messages.map((m) => 
                { 
                    const contact = contacts.find(c => c.userID === m.sender)
                    return (
                        <>
                            <div className="pb-4" style={m.sender === loginID ? {marginLeft: "auto"} : {}}>
                                <small className="d-block text-white text-muted">    
                                    {m.sender === loginID ? "You" : (contact ? contact.userName : m.sender)}            
                                </small>
                                <span className={`text-white d-inline p-2 rounded text-break ${m.sender === loginID ? "bg-secondary float-end" : "bg-primary float-start"}`}>
                                    {m.message}
                                </span>
                            </div>
                        </>
                    )
                }        
            )}
            <div ref={divRef}></div>
            </div>
            <div className="chat_interaction">
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    sendMsg([selectedConversation.conversationID, loginID, txtMessage.current.value, [...selectedConversation.recipients , loginID]])
                    txtMessage.current.value = null    
                }}>
                    <InputGroup>
                        <Form.Control ref={txtMessage}></Form.Control>
                        <Button variant='primary' type='submit'>Send</Button>
                    </InputGroup>
                </Form>
            </div>
        </>
    )
}
