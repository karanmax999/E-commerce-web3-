import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useWeb3 } from "../web3Context";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { walletAddress } = useWeb3();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("🛒 Added to cart");
  };

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products/");
        const results = await response.json();
        if (isMounted) {
          setData(results);
          setFilter(results);
          setLoading(false);
        }
      } catch (err) {
        toast.error("Failed to fetch products.");
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filterProduct = (cat) => {
    if (cat === "All") {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => item.category === cat);
      setFilter(updatedList);
    }
  };

  const Loading = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" key={index}>
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-4">
        {["All", "men's clothing", "women's clothing", "jewelery", "electronics"].map((cat) => (
          <button
            key={cat}
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filter.map((product) => (
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" key={product.id}>
          <div className="card text-center h-100">
            <img
              className="card-img-top p-3"
              src={product.image}
              alt={product.title}
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">
                {product.title.substring(0, 12)}...
              </h5>
              <p className="card-text">
                {product.description.substring(0, 90)}...
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">$ {product.price}</li>
            </ul>
            <div className="card-body">
              <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="display-5">Latest Products</h2>
          <hr />
          {!walletAddress && (
            <div className="alert alert-warning mt-2">
              ⚠️ Connect your wallet to unlock blockchain features.
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default ProductCard;
