import React from 'react'
import {Alert} from 'react-bootstrap'

const AlertComponent = ({variant, message}) => {
  return (
    <Alert variant={variant}>
        <p>{message}</p>
    </Alert>
  )
}

export default AlertComponent