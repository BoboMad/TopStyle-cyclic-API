import {useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ShoppingCartComponent from './ShoppingCartComponent';
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";

const OffcanvasShoppingCart = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
    <>
      <Link onClick={handleShow} className="me-2 text-decoration-none" style={{ color: 'inherit' }}>
        Shopping cart <IoCartOutline/>
      </Link>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ShoppingCartComponent/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffcanvasShoppingCart;