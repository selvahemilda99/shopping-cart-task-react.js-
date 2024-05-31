import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "../Components/Data";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.find((product) => product.id == id);
    if (filterProduct) {
      setProduct(filterProduct);

      const relatedProducts = items.filter(
        (item) => item.category === filterProduct.category && item.id != id
      );
      setRelatedProducts(relatedProducts);
    }
  }, [id]);

  const addToCart = (id, price, name, category, url) => {
    const obj = {
      id,
      price,
      name,
      category,
      url,
    };
    setCart([...cart, obj]);
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container detail">
        <div className="img">
          <img src={product.url} alt={product.name} />
        </div>
        <div className="text-center ">
          <h1 className="card-title">{product.name}</h1>
          <p className="card-text">{product.category}</p>
          {product.specs && (
            <>
              <p>
                <b>Processor:</b> {product.specs.processor}
              </p>
              <p>
                <b>RAM:</b> {product.specs.RAM}
              </p>
              <p>
                <b>Storage:</b> {product.specs.storage}
              </p>
              <p>
                <b>Display:</b> {product.specs.display}
              </p>
              <p>
                <b>Graphics:</b> {product.specs.graphics}
              </p>
              <p>
                <b>Operating System:</b> {product.specs.operating_system}
              </p>
              <p>
                <b>Weight:</b> {product.specs.weight}
              </p>
              <p>
                <b>Battery Life:</b> {product.specs.battery_life}
              </p>
              <p>
                <b>Ports:</b> {product.specs.ports}
              </p>
            </>
          )}
          <h5>Price: {product.price} ₹</h5>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.price,
                product.name,
                product.category,
                product.url
              )
            }
            className="btn btn-warning"
          >
            Add
          </button>
        </div>
      </div>
      <h1 className="text-center">Related Products</h1>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
};

export default ProductDetail;
