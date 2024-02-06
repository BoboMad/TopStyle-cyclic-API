import React, { useContext, useState } from 'react'
import { Container,Row, Col, Button, Image } from 'react-bootstrap'
import { AppContext } from '../ContextApi/AppProvider';
import AlertComponent from './AlertComponent';

const CheckOut = () => {
    const {cart, setCart, RemoveProductFromCart, PlaceOrder, user} = useContext(AppContext);
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const orderTotal = () => {
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

    const handlePlaceOrder = async () => {
        if(cart.length === 0){
            updateAlert('danger','Cart is currently empty')
            return;
        }

        if(!user){
            updateAlert('danger','You need to login to place an order')
            return;
        }

        try{
            const response = await PlaceOrder();
            console.log('response', response);

            if (response && response.success) {
                updateAlert('success', `The order was placed successfully, your order number is : ${response.order._id}`)
            }
            else{
                updateAlert('danger', response.error)
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const updateAlert = (variant, message) => {
        setAlertVariant(variant);
        setAlertMessage(message);
        setShowAlert(true);
    }


  return (
    <Container className='w-50'>
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
                        <Row>
                            <Col><Image src={item.productImage} fluid/></Col>
                            <Col>
                                    <p>{item.name}</p>
                            </Col>
                            <Col>
                            <div className="d-flex align-items-center">
                                <button onClick={()=> handleDecrease(item._id)}>-</button>
                                <p className="mx-2">{item.quantity}</p>
                                 <button onClick={() => handleIncrease(item._id)}>+</button>
                            </div>
                            </Col>
                            <Col className='text-end'>
                                <p>{item.price.toFixed(2)}</p>
                                        
                            </Col>    
                        </Row>
                        </li>
                    ))}
                </ul>
            </Container>)
            :
            (<p>No products selected</p>)
            }
            
            <Container>
                <Row>
                    <Col>
                        <p>Total:</p>
                    </Col>
                    <Col className='text-end'>
                        <p>{cart ? orderTotal() : '0.00'} kr</p>
                    </Col>
                </Row>
                 
            </Container>

            <Container>
                <Row>
                    {showAlert && <AlertComponent message={alertMessage} variant={alertVariant} />}
                </Row>
                <Row>
                    <Col>
                        <Button onClick={handlePlaceOrder}>Place order</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
  )
}

export default CheckOut