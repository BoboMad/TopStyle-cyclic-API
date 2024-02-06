import React,{useState} from 'react'
import { Container, Form, FloatingLabel, Nav, Button } from 'react-bootstrap';
import { signupUser } from '../services/user';
import AlertComponent from './AlertComponent';

const Signup = ({showSignup}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState();
    const [alertVariant, setAlertVariant] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const updateAlert = (variant, message) => {
        setAlertVariant(variant);
        setAlertMessage(message);
        setShowAlert(true);
    }

    const handlesubmit = async (e) =>{
        e.preventDefault();

        if(password !== confirmPassword){
            updateAlert('danger', 'Password didn\'t match');
            return;
        }

        try{
            const response = await signupUser(email, password);
            if(response.ok){
                updateAlert('success', 'Account created');
            }
        }
        catch(error){
            console.error('Error signing up:', error);
            updateAlert('danger', error.message)
        }

    }


  return (
    <Container>
        <Form onSubmit={handlesubmit}>
            <FloatingLabel  
            controlId="floatingInput"
            label="E-mail"
            className="mb-3">

                <Form.Control value={email} type='email' placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>

            <FloatingLabel 
            controlId="floatingPassword" 
            label="Password"
            className='my-2'>
                <Form.Control value={password} type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>

            <FloatingLabel 
            controlId="floatingPassword2" 
            label="Confirm password"
            className='my-2'>
                <Form.Control value={confirmPassword}  type="password" placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </FloatingLabel>

            <Button className='my-2' onClick={handlesubmit}>Sign up</Button>
            {showAlert && (
                <AlertComponent variant={alertVariant} message={alertMessage}/>
            )}
            <Nav.Link onClick={showSignup}>&lt; Login</Nav.Link>
            
        </Form>
    </Container>
  )
}

export default Signup