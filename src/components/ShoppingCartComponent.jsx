import React, { useContext} from 'react';
import {AppContext} from '../ContextApi/AppProvider';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import {Link } from "react-router-dom";

const ShoppingCartComponent = () => {
    const {cart, setCart, RemoveProductFromCart} = useContext(AppContext);

    const cartTotal = () => {
        return cart.reduce((total, item) => total + item.price*item.quantity, 0).toFixed(2);
    };

    const handleDecrease = (itemId) => {
        const updatedCart = cart.map((item) =>
        item._id === itemId 
        ?{ 
            ...item, 
            quantity: Math.max(item.quantity - 1, 0) 
        } 
        : item
    );

        setCart(updatedCart);

        const updatedItem= updatedCart.find((item) => item._id === itemId)
        if(updatedItem && updatedItem.quantity === 0){
            RemoveProductFromCart(itemId);
        }
    };

    const handleIncrease = (itemId) => {
        const updatedCart = cart.map((item) =>
            item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    return (
        <Container>
            {cart && cart.length > 0 ? (
            <Container>
                <Row className='my-4'>
                    <Col></Col>
                    <Col>Product</Col>
                    <Col>Quantity</Col>
                    <Col className='text-end'>Price</Col>
                </Row>
                <ul style={{listStyleType: 'none', padding:0}}>
                    {cart.map((item) =>(
                        <li key={item._id}>
                        <Row className='align-items-center'>
                            <Col xs={2}><Image src={item.productImage} fluid/></Col>
                            <Col xs={4}>
                                    <p>{item.name}</p>
                            </Col>
                            <Col xs={4}>
                            <div className="d-flex align-items-center">
                                <button onClick={()=> handleDecrease(item._id)}>-</button>
                                <p className="mx-2">{item.quantity}</p>
                                 <button onClick={() => handleIncrease(item._id)}>+</button>
                            </div>
                            </Col>
                            <Col xs={2} className='text-end'>
                                <p>{item.price.toFixed(2)}</p>
                                        
                            </Col>    
                        </Row>
                        </li>
                    ))}
                </ul>
            </Container>)
            :
            (<p>Shopping cart is emprty</p>)
            }
            
            <Container>
                <Row>
                    <Col>
                        <p>Total:</p>
                    </Col>
                    <Col className='text-end'>
                        <p>{cart ? cartTotal() : '0.00'} kr</p>
                    </Col>
                </Row>
                 
            </Container>

            <Container>
                <Row>
                    <Col>
                        <Button as={Link} to="/checkout">Checkout</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
        
  )
}

export default ShoppingCartComponent