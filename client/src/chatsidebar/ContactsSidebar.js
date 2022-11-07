import React, {useRef} from 'react'
import { Button, ListGroup, Form, Modal } from 'react-bootstrap'
import { useContactContext } from '../contexts/ContactProvider'

export default function ContactsSidebar({modalOpenState, setModalOpenState}) {
    const userIDRef = useRef()
    const userNameRef = useRef()
    const { contacts, addContact } = useContactContext()
    return (
        <>
             <Modal show={modalOpenState} onHide={() => setModalOpenState(false)}>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    addContact(userIDRef.current.value, userNameRef.current.value)
                    setModalOpenState(false)
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>ID of User</Form.Label>
                        <Form.Control required ref={userIDRef}></Form.Control>
                        <Form.Label>Username</Form.Label>
                        <Form.Control required ref={userNameRef}></Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <ListGroup>
                <ListGroup.Item className="header">
                    Contacts
                    <Button size='sm' variant='light' className='float-end' onClick={() => setModalOpenState(true)}><i className="fa fa-plus"></i></Button>
                </ListGroup.Item>
                {contacts.map((c,index) => <ListGroup.Item key={index}>{c.userName}</ListGroup.Item>)}   
            </ListGroup>
        </>
    )
}
