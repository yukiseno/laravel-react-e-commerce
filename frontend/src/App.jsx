import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import Product from "./components/products/Product";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
