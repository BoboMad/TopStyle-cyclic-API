import React,{useContext} from 'react'
import {Container, Row, Col,Button} from 'react-bootstrap'
import { AppContext } from '../ContextApi/AppProvider'

const QuantityControl = ({productId}) => {
    const {IncreaseProductQuantity, DecreaseProductQuantity, cart} = useContext(AppContext);
    const productInCart = cart.find(product => product._id === productId);

    const handleIncrease = () => {
        IncreaseProductQuantity(productId);
    }

    const handleDecrease = () => {
        DecreaseProductQuantity(productId);
    }
  
  
    return (
    <Container>
        <Row style={{justifyContent: 'center'}}>
            <Col className='m-0 p-0 text-center'><Button onClick={handleDecrease}>-</Button></Col>
            <Col className='m-0 p-0 text-center'><p>{productInCart.quantity}</p></Col>
            <Col className='m-0 p-0 text-center'><Button onClick={handleIncrease} className='m-0'>+</Button></Col>
        </Row>
    </Container>
  )
}

export default QuantityControl
