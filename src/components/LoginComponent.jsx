import React, {useState, useContext} from 'react'
import {Button, Form} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {AppContext} from '../ContextApi/AppProvider';
import {loginUser} from '../services/user';
import Nav from 'react-bootstrap/Nav';
import AlertComponent from './AlertComponent';

const LoginComponent = ({showSignup}) => {
    const {setUser} = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

  
    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            const userData = await loginUser(email, password);
            setUser(userData);
        }
        catch (error) 
        {
            setShowAlert(true);
            setAlertMessage(error.message);
        }
    }
  
  
    return (

        <Form onSubmit={handleLogin}>

            <FloatingLabel  
            controlId="floatingInput"
            label="E-mail"
            className="mb-3">

                <Form.Control type='email' placeholder='name@example.com' onChange={e => setEmail(e.target.value)} />
            </FloatingLabel>

            <FloatingLabel 
            controlId="floatingPassword" 
            label="Password">
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </FloatingLabel>

            <Button className='m-3' type='submit'>Login</Button>

            {showAlert && (
            <AlertComponent variant="danger" message={alertMessage} />
            )}

            <Nav.Link onClick={showSignup}>&lt; Sign up</Nav.Link>
            
        </Form>
  )
}

export default LoginComponent;