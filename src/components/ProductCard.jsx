import {Card, Button, Col, Row} from 'react-bootstrap';
import { AppContext } from '../ContextApi/AppProvider';
import { useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import QuantityControl from './QuantityControl';

function ProdctCard({product}) {
    const {AddProductToCart, cart} = useContext(AppContext);
    const navigate = useNavigate();

    //om något element matchar id, retunerar true/false
    const isProductInCart = cart.some((cartProduct) => cartProduct._id === product._id);

    const handleAddToCart = () =>{
        AddProductToCart(product);
    }

    const handleDetails = () => {
        navigate(`/product/${product._id}`);
    }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.productImage} />
      <Card.Body>
        <Card.Title style={{height: 40}}>{product.name}</Card.Title>
        <Card.Text>{product.price.toFixed(2)} kr</Card.Text>
        <Row>
        {isProductInCart ? (
            <Col>
                <QuantityControl productId={product._id}/>
            </Col>)
        :
        (
            <Col><Button onClick={handleAddToCart}>Add to cart</Button></Col>
        )}
        <Col className='text-center'><Button onClick={handleDetails}>Details</Button></Col>
        </Row>  
      </Card.Body>
    </Card>
  );
}

export default ProdctCard;