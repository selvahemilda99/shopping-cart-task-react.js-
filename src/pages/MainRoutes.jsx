import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { LoginSignup } from "./LoginSignup";
import Cart from "../Components/Cart";
// import ProductDetail from "./ProductDetails";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loginSignup" element={<LoginSignup />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route
        path="/product/:id"
        element={<ProductDetail cart={cart} setCart={setCart} />}
      /> */}
    </Routes>
  );
}
