import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { AppContext } from "../ContextApi/AppProvider";
import { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = () =>{
    const {products, GetAllProducts, filteredProducts, searchValue} = useContext(AppContext);
    
    useEffect(() => {
        GetAllProducts();
    }, []);

    return(

        <Container>
            <SearchBar/>

            <Container fluid
                    className="d-flex flex-column justify-content-center align-items-start w-75 mt-3"
            >
            <Row>
                { searchValue === '' ?(
                    products.length > 0 ?( 
                        products.map((product) => (

                            <Col key={product?._id}>
                                <ProductCard product={product}/>
                            </Col>
                )) 
                ) : (
                    <Col>
                        <p>No Products found</p>
                    </Col>
                    )
                ) : (
                    filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col key={product?._id}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                ): (
                    <Col>
                        <p>No matching products found</p>
                    </Col>
                )
                )}
            </Row>
        </Container>
    </Container>
    );
}

export default ProductGrid;

