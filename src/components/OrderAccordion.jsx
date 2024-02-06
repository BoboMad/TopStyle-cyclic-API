import Accordion from 'react-bootstrap/Accordion';
import React from 'react'
import OrderDetails from './OrderDetails'

function OrderAccordion({order}) {
    return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
            <p>Order number: {order._id}</p>
        </Accordion.Header>
        <Accordion.Body>
            <OrderDetails order={order}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default OrderAccordion;