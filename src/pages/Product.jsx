import React, { useState } from "react";

const Product = ({
  items,
  addToCart,
  addToWishlist,
  removeFromCart,
  cartCount,
}) => {
  const [itemCounts, setItemCounts] = useState({});
  const [showCart, setShowCart] = useState(false); // State to track whether to show cart items

  const handleAddToCart = (product) => {
    addToCart(product);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [product.id]: (prevCounts[product.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [product.id]: (prevCounts[product.id] || 0) - 1,
    }));
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="container my-5" style={{ display: "grid" }}>
      <div className="row">
        {items &&
          items.map((product) => (
            <div
              key={product.id}
              className="col-lg-4 col-md-6 my-3 text-center"
            >
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={product.url}
                  className="card-img-top"
                  alt={product.name}
                />
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="btn btn-info"
                  style={{ backgroundColor: "blue", color: "white" }}
                >
                  Wish
                </button>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.category}</p>
                  <h5>Price: {product.price} ₹</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group" role="group">
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="btn btn-secondary"
                      >
                        -
                      </button>
                      <button className="btn btn-light disabled">
                        {itemCounts[product.id] || 0}
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-secondary"
                      >
                        +
                      </button>
                    </div>
                    <button
                      style={{ backgroundColor: "yellow" }}
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-warning ml-2"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Cart Button */}
      <button onClick={toggleCart} className="btn btn-primary">
        Cart ({cartCount})
      </button>

      {/* Display Cart List */}
      {showCart && (
        <div>
          <h2>Cart List</h2>
          <ul>
            {Object.entries(itemCounts).map(([productId, count]) => (
              <li key={productId}>
                Product ID: {productId}, Quantity: {count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Product;
