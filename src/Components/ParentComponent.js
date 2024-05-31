import React, { useState } from "react";
import Wishlist from "./Wishlist";
import Product from "./Product";
import { items } from "./Data";

function ParentComponent() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromWishlist = (product) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== product.id)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <div>
      <Wishlist
        wishlist={wishlist}
        addToCart={addToCart}
        removeFromWishlist={removeFromWishlist}
        clearWishlist={clearWishlist}
      />
      <Product items={items} addToCart={addToCart} />
    </div>
  );
}

export default ParentComponent;
