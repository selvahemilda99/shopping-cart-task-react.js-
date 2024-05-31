import React, { useState, useEffect } from "react";

const Cart = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const calculateTotalPrice = () => {
    const total = cart.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    setTotalPrice(total);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  const handleChange = (id, value) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + value) }
          : product
      )
    );
  };

  return (
    <article>
      {cart.map((product) => (
        <div className="cart_box" key={product.id}>
          <div className="cart_img">
            <img src={product.url} alt={product.name} />
            <p>{product.name}</p>
          </div>
          <div>
            <button onClick={() => handleChange(product.id, 1)}> + </button>
            <span>{product.quantity || 0}</span>{" "}
            <button onClick={() => handleChange(product.id, -1)}> - </button>
          </div>
          <div>
            <span>{(product.price * product.quantity).toFixed(2)}</span>{" "}
            <button onClick={() => handleRemove(product.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>Rs - {totalPrice.toFixed(2)}</span>
      </div>
    </article>
  );
};

export default Cart;
