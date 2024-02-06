import React from 'react'
import { Container,Row, Col,Image } from 'react-bootstrap'

const OrderDetails = ({order}) => {
  return (
        <Container key={order._id}>
            <Row className='mb-3'>
                <Col></Col>
                <Col>Product</Col>  
                <Col>Quantity</Col>
                <Col>Price</Col>
            </Row>
            {order.products.map((product, productIndex)=>(
                <Row key={productIndex}>
                    <Col><Image src={`https://weak-teal-haddock-toga.cyclic.app/${product.product.productImage}`} fluid/></Col>
                    <Col>{product.product.name}</Col>  
                    <Col>{product.quantity}</Col>
                    <Col>{product.product.price.toFixed(2)}</Col>
                </Row>
            ))}

            <Row className='mt-4'>
                <Col>Total: {order.totalAmount.toFixed(2)}</Col>
            </Row>
        </Container>
  )
}

export default OrderDetails