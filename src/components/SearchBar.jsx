import {Form, Col, Container} from 'react-bootstrap'
import React, {useContext} from 'react'
import { AppContext } from '../ContextApi/AppProvider';

const SearchBar = () => {
    const {SearchProduct, searchValue, setSearchValue} = useContext(AppContext);
    

    const handleChange = (e) =>{
        const value = e.target.value;
        setSearchValue(value);
        SearchProduct(value);
    }

  return (
    <Container className='d-flex justify-content-center w-50'>
        <Col>
            <Form.Control onChange={handleChange} type="text" placeholder="Search" className=" mr-sm-2" />
        </Col>
    </Container>
  )
}

export default SearchBar


