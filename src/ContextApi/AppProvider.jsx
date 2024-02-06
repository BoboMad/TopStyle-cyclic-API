import {useState, createContext} from 'react';
import {fetchAllProducts, fetchProductById} from '../services/products';
import { createOrder, fetchUserOrders } from '../services/Orders';
export const AppContext = createContext();

const AppProvider = (props) =>{
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const SearchProduct = (searchValue) =>{
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        
        setFilteredProducts(filtered);
    }

    const fetchOrders = async () =>{
        try{
            if(user){
                const data = await fetchUserOrders(user);
                setOrders(data && data !== undefined ? data : []);
            }
            else{
                setOrders([]);
            }
        }
        catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    const PlaceOrder = async () =>{
        try{
            const response = await createOrder(user,cart);
            console.log('response from createOrder', response)
            if (response.success){
                console.log('Order placed successfully. Clearing the cart.');
                setCart([]);
            }

            return response;

        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    const IncreaseProductQuantity = (productId) =>{
        const updatedCart = cart.map((cartItem) =>
            cartItem._id === productId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCart(updatedCart);
    }

    const DecreaseProductQuantity = (productId) =>{
        const updatedCart = cart.map((cartItem) =>
        cartItem._id === productId
        ?{ 
            ...cartItem, 
            quantity: Math.max(cartItem.quantity - 1, 0) 
        } 
        : cartItem
    );

        setCart(updatedCart);

        const updatedProduct = updatedCart.find((product) => product._id === productId)
        if(updatedProduct && updatedProduct.quantity === 0){
            RemoveProductFromCart(productId);
        }
    }


    const AddProductToCart = (product) => {
        const existingProductIndex = cart.findIndex((item)=>item._id === product._id)
        
        if(existingProductIndex !== -1){
            const updatedCart = [...cart];

            updatedCart[existingProductIndex] = {
                ...updatedCart[existingProductIndex],
                quantity: updatedCart[existingProductIndex].quantity + 1
            };
            setCart(updatedCart)
        }
        else{
            setCart([...cart, {...product, quantity:1}])
        }
    }

    const RemoveProductFromCart = (productId) => {
        const existingProductIndex = cart.findIndex((item) => item._id === productId);

    if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart.splice(existingProductIndex, 1);
        setCart(updatedCart);
    }
    }

    const GetAllProducts = async () =>{
        try{
            const data = await fetchAllProducts();
            setProducts(data && data !== undefined ? data.products : []);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const GetProduct = (productId) =>{
        fetchProductById(productId).then((data) => {
            setProduct(data && data !== undefined ? data : null);
        });
    }


    return(
        <AppContext.Provider value = {{
            GetAllProducts, 
            products, 
            GetProduct, 
            product, 
            setUser, 
            user, 
            cart, 
            setCart, 
            AddProductToCart, 
            RemoveProductFromCart, 
            PlaceOrder,
            orders,
            fetchOrders,
            SearchProduct,
            filteredProducts,
            searchValue,
            setSearchValue,
            DecreaseProductQuantity,
            IncreaseProductQuantity,

        }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;
