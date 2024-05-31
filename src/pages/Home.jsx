import React, { useState } from "react";
import { Heading, Button } from "@chakra-ui/react";
import Product from "./Product";
import Cart from "../Components/Cart";
import Wishlist from "../Components/Wishlist";
import { items } from "../Components/Data";
import { AuthContextProvider } from "../contexts/AuthContext";

export function Home() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex > -1) {
        const updatedCart = prevCart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setTotalAmount((prev) => prev + product.price);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex > -1) {
        const existingProduct = prevCart[existingProductIndex];
        if (existingProduct.quantity > 1) {
          const updatedCart = prevCart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          return updatedCart;
        } else {
          const updatedCart = prevCart.filter((item) => item.id !== product.id);
          return updatedCart;
        }
      }
      return prevCart;
    });
    setTotalAmount((prev) => prev - product.price);
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (!isInWishlist) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const handleShowCart = () => setShowCart(!showCart);
  const handleShowWishlist = () => setShowWishlist(!showWishlist);

  const clearCart = () => {
    setCart([]);
    setTotalAmount(0);
  };

  return (
    <div>
      <Heading>Home</Heading>
      <AuthContextProvider>
        <Button onClick={handleShowCart} mt="4" mb="4">
          {showCart
            ? "Hide Cart"
            : `Cart (${cart.reduce((acc, item) => acc + item.quantity, 0)})`}
        </Button>
        <Button onClick={handleShowWishlist} mt="4" mb="4">
          {showWishlist ? "Hide Wishlist" : `Wishlist (${wishlist.length})`}
        </Button>
        {showCart && (
          <Button onClick={clearCart} colorScheme="red" ml="4" mt="4">
            Clear Cart
          </Button>
        )}
        {/* <Cart cart={cart} setCart={setCart} /> */}
        {showCart ? (
          <Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} />
        ) : showWishlist ? (
          <Wishlist wishlist={wishlist} addToCart={addToCart} />
        ) : (
          <Product
            items={items}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            removeFromCart={removeFromCart}
          />
        )}
      </AuthContextProvider>
    </div>
  );
}
