import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginComponent from './LoginComponent';
import Signup from './Signup';

const OffcanvasLogin = () => {
    const [show, setShow] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowSignup(false);
    }
    
    const handleShow = () => setShow(true);

    const handleShowSignup = () => {
        setShowSignup(!showSignup);
    }
  
    return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Login
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{showSignup ? 'Sign up' : 'Login'}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {showSignup ? <Signup showSignup={handleShowSignup}/> : <LoginComponent showSignup={handleShowSignup}/>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffcanvasLogin