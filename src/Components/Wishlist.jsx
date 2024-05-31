import React from "react";

const Wishlist = ({
  wishlist,
  addToCart,
  removeFromWishlist,
  clearWishlist,
}) => {
  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product);
  };

  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product);
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  return (
    <div className="container my-5">
      <div className="row">
        {wishlist.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 my-3 text-center">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={product.url}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.category}</p>
                <h5>Price: {product.price} ₹</h5>
                {/* <button
                  onClick={() => handleMoveToCart(product)}
                  className="btn btn-warning mr-2"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(product)}
                  className="btn btn-danger mr-2"
                >
                  Remove
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {wishlist.length > 0 && (
        <div className="text-center mt-3">
          <button onClick={handleClearWishlist} className="btn btn-danger">
            Clear Wishlist
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Wishlist;
