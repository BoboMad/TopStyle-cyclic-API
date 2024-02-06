import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../ContextApi/AppProvider'
import { Container, Row, Col } from 'react-bootstrap';
import OrderAccordion from './OrderAccordion';

const Orders = () => {
    const {fetchOrders, orders} = useContext(AppContext);

    useEffect(() =>{
        fetchOrders();
    },[])

  return (
    <Container className='w-50 my-10'>
        {orders && orders.length >0 ? 
        (orders.map((order, orderIndex)=>(
            <OrderAccordion key={orderIndex} order={order}/>
        )))
        :
        (<p>No orders found</p>)}
    </Container>
  )
}

export default Orders