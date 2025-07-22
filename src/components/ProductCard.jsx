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
            className="btn btn-sm m-2"
            style={{
              border: '2px solid #2196f3',
              color: '#2196f3',
              backgroundColor: 'transparent',
              borderRadius: '20px',
              padding: '8px 20px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              textTransform: 'capitalize'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2196f3';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(33, 150, 243, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#2196f3';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => filterProduct(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filter.map((product) => (
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" key={product.id}>
          <div className="card text-center h-100" style={{
            border: 'none',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 5px 25px rgba(33, 150, 243, 0.1)',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(33, 150, 243, 0.2)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 25px rgba(33, 150, 243, 0.1)';
          }}>
            <img
              className="card-img-top p-3"
              src={product.image}
              alt={product.title}
              height={300}
              style={{
                transition: 'all 0.3s ease',
                borderRadius: '15px'
              }}
            />
            <div className="card-body">
              <h5 className="card-title" style={{
                color: '#1565c0',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>
                {product.title.substring(0, 12)}...
              </h5>
              <p className="card-text" style={{
                color: '#666',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                {product.description.substring(0, 90)}...
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead" style={{
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                border: 'none',
                color: '#1976d2',
                fontWeight: '700',
                fontSize: '1.3rem'
              }}>$ {product.price}</li>
            </ul>
            <div className="card-body">
              <Link to={`/product/${product.id}`} className="btn m-1" style={{
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }} onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 15px rgba(33, 150, 243, 0.4)';
              }} onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                Buy Now
              </Link>
              <button className="btn m-1" style={{
                border: '2px solid #2196f3',
                color: '#2196f3',
                backgroundColor: 'transparent',
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2196f3';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 15px rgba(33, 150, 243, 0.3)';
              }} onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#2196f3';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }} onClick={() => addProduct(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3" style={{
      background: 'linear-gradient(135deg, #f8fbff 0%, #e3f2fd 100%)',
      borderRadius: '20px',
      boxShadow: '0 5px 25px rgba(33, 150, 243, 0.1)'
    }}>
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="display-5" style={{
            color: '#1565c0',
            fontWeight: '600',
            marginBottom: '1rem',
            textShadow: '0 1px 3px rgba(21, 101, 192, 0.2)'
          }}>Latest Products</h2>
          <hr style={{
            border: 'none',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
            margin: '2rem auto',
            width: '100px',
            borderRadius: '2px'
          }} />
          {!walletAddress && (
            <div className="alert mt-2" style={{
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              borderRadius: '15px',
              color: '#e65100',
              padding: '15px 20px'
            }}>
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
