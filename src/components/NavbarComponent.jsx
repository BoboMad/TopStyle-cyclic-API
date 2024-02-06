import OffcanvasLogin from './OffcanvasLogin';
import OffcanvasShoppingCart from './OffcanvasShoppingCart'
import Navbar from 'react-bootstrap/Navbar';
import {Link } from "react-router-dom";
import {Col, Container, Nav, Button} from 'react-bootstrap';
import { AppContext } from '../ContextApi/AppProvider';
import { useContext} from 'react';


const NavbarComponent = () => {
  const {user, setUser} = useContext(AppContext);
  const handleLogout = () =>{
    setUser(null);
  }

  return (
    <Navbar>
        <Container>
          <Col>
            <Navbar.Brand href="#home">TopStyle</Navbar.Brand>
          </Col>
          <Col>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Products</Nav.Link>
              <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
              
            </Nav>
          </Col>
        </Container>
      
      <Container id='login' className='d-flex'>

          <Col className='text-end'>
            <OffcanvasShoppingCart/>
          </Col>
          <Col className='text-end' >
            {user ? 
              <>
                <p className="me-2 d-inline" style={{ color: 'green' }}>Logged in</p>
                <Button onClick={handleLogout} className='d-inline'>Log out</Button>
              </>
             :
              (<OffcanvasLogin/>)}
          </Col>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent;