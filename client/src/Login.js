import { useRef } from 'react'
import { Form, InputGroup, Container, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function Login({setLoginID}) {
    const txtLoginID = useRef()
    return (
        <>
           <Form onSubmit={(e) => {
                e.preventDefault()
                setLoginID(txtLoginID.current.value)
           }}>
                <div className='d-flex vh-100 align-items-center'>
                    <Container style={{zoom: 3}}>
                        <Form.Label className='text-white'>SKChat - Simple Chat Application Using Socket And React</Form.Label>
                        <InputGroup>  
                            <InputGroup.Text>
                                Your ID
                            </InputGroup.Text>
                            <Form.Control ref={txtLoginID} required/>
                        </InputGroup>
                        <Button type='submit'>Login</Button>
                        <Button className='m-2' variant='secondary' onClick={() => {
                            setLoginID(uuidv4())
                        }}>Random A New ID</Button>
                    </Container>
                </div>
            </Form>
        </>
    )
}
