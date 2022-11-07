import React, { useState, useRef } from 'react'
import { Button, ListGroup, Form, Modal } from 'react-bootstrap'
import { useContactContext } from '../contexts/ContactProvider'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useConversationsContext } from '../contexts/ConversationsProvider';
const animatedComponents = makeAnimated();
export default function ConversationsSidebar({modalOpenState, setModalOpenState, loginID}) {
    const { contacts } = useContactContext()
    const { exportConversations , createConversation, setSelectedConversationIndex, setCurrChatName } = useConversationsContext() 
    const contactsOptions = contacts.map(c => {return {value: c.userID , label: c.userName}})
    const conversationName = useRef()
    const [contactOptionsSelected , setContactOptionsSelected] = useState([])
    return (
        <>
            <Modal show={modalOpenState} onHide={() => setModalOpenState(false)}>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    if (!contactOptionsSelected.length) {
                        alert("You must select at least 1 recipient")
                        return
                    }
                    createConversation(conversationName.current.value , [...contactOptionsSelected , loginID])
                    setModalOpenState(false)
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Conversations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control placeholder="Enter conversation's name (optional)" ref={conversationName}></Form.Control>
                        <Select options={contactsOptions} closeMenuOnSelect={false} isMulti components={animatedComponents} placeholder="Recipients" onChange={(o) => setContactOptionsSelected(o.map(ov => {return ov.value}))}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <ListGroup>
                <ListGroup.Item className="header">
                    Conversations
                    <Button size='sm' variant='light' className='float-end' onClick={() => setModalOpenState(true)}><i className="fa fa-plus"></i></Button>
                </ListGroup.Item>
                {exportConversations.map((c,index) =>  
                    { 
                        let exportName = c.recipients.map(r => {
                            const nameFilter = contacts.find(ct => ct.userID === r)
                            if (nameFilter) return nameFilter.userName
                            if (r === loginID) return "You"
                            return r
                        }).join(", ")  

                        return !c.conversationName.length ? 
                        <ListGroup.Item className={c.selected && "active"} key={index} onClick={() => (setSelectedConversationIndex(index) , setCurrChatName(exportName))}>
                        {
                            exportName  
                        }
                        </ListGroup.Item> : <ListGroup.Item className={c.selected && "active"} key={index} onClick={() => (setSelectedConversationIndex(index) , setCurrChatName(c.conversationName))}>{c.conversationName}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </>
    )
}
