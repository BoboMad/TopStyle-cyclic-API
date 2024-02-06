import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {NavbarComponent, ProductGrid, ProductDetailView} from "./components/components";
import CheckOut from './components/CheckOut';
import Orders from './components/Orders';
import AppProvider from './ContextApi/AppProvider';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
function App() {


  return (
    <>
      <AppProvider>
        <Router>
          <NavbarComponent/>
          <Routes>
                <Route exact path="/" element={<ProductGrid/>} />
                <Route path="/checkout" element={<CheckOut/>} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/product/:productId" element={<ProductDetailView />} />
          </Routes>
        </Router>
      </AppProvider>
    
    </>
  )
}

export default App
