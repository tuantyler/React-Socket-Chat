import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useContactContext } from '../contexts/ContactProvider'
import { useConversationsContext } from '../contexts/ConversationsProvider'

export default function PublicChatsSidebar() {
    const { activePublicChats } = useConversationsContext()
    const { contacts } = useContactContext()
    return (
        <>
            <ListGroup>
                <ListGroup.Item className="header">
                    Public Chats
                </ListGroup.Item>
                <ListGroup.Item>
                    <h5>Active Users <Button size='sm' variant='success' className='float-end'>{activePublicChats.length - 1}</Button></h5>
                </ListGroup.Item>

                {activePublicChats.map(a => {
                    const name = contacts.find(c => c.userID === a)
                    if (name) {
                        return <ListGroup.Item className='active'>{name.userName}</ListGroup.Item>
                    }
                    return <ListGroup.Item className='active'>{a}</ListGroup.Item>
                })}        
            </ListGroup>  
        </>
    )
}
