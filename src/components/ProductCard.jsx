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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const dispatch = useDispatch();
  const { walletAddress } = useWeb3();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("🛒✨ Added to cart with style!", {
      style: {
        background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
        color: 'white',
        borderRadius: '25px',
        padding: '16px 24px'
      }
    });
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
        toast.error("❌ Failed to fetch products.", {
          style: {
            background: 'linear-gradient(45deg, #f44336, #e91e63)',
            color: 'white',
            borderRadius: '25px'
          }
        });
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filterProduct = (cat) => {
    let filteredData = data;
    
    if (cat === "All") {
      filteredData = data;
    } else {
      filteredData = data.filter((item) => item.category === cat);
    }
    
    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price filter
    filteredData = filteredData.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortBy === "price-low") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filteredData.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filteredData.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }
    
    setFilter(filteredData);
  };

  // Update filter when search term, sort, or price range changes
  useEffect(() => {
    filterProduct("All");
  }, [searchTerm, sortBy, priceRange, data]);

  const Loading = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" key={index}>
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f3f9ff 0%, #fce4ec 50%, #f3e5f5 100%)'
          }}>
            <Skeleton height={592} baseColor="#f0f0f0" highlightColor="#e0e0e0" />
          </div>
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      {/* Enhanced Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 187, 217, 0.1) 50%, rgba(225, 190, 231, 0.1) 100%)',
            border: 'none',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(156, 39, 176, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '20px'
          }}>
            <div className="row align-items-center">
              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={{
                    background: 'linear-gradient(45deg, #2196f3, #9c27b0)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px 0 0 15px'
                  }}>🔍</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      border: '2px solid rgba(156, 39, 176, 0.2)',
                      borderLeft: 'none',
                      borderRadius: '0 15px 15px 0',
                      padding: '12px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <select 
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: '2px solid rgba(156, 39, 176, 0.2)',
                    borderRadius: '15px',
                    padding: '12px',
                    background: 'white'
                  }}
                >
                  <option value="default">Sort by Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              
              <div className="col-md-5 mb-3">
                <label className="form-label" style={{ color: '#7b1fa2', fontWeight: '600' }}>
                  💰 Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="range"
                    className="form-range me-3"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    style={{ accentColor: '#9c27b0' }}
                  />
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    style={{ accentColor: '#e91e63' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons text-center py-4">
        {["All", "men's clothing", "women's clothing", "jewelery", "electronics"].map((cat) => (
          <button
            key={cat}
            className="btn btn-sm m-2"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #9c27b0, #e91e63) border-box',
              color: '#7b1fa2',
              backgroundColor: 'transparent',
              borderRadius: '20px',
              padding: '8px 20px',
              fontWeight: '500',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'capitalize',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #2196f3, #9c27b0, #e91e63)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #9c27b0, #e91e63) border-box';
              e.target.style.color = '#7b1fa2';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
            onClick={() => filterProduct(cat)}
          >
            {cat === "All" ? "🌟 " : ""}
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
            boxShadow: '0 8px 30px rgba(156, 39, 176, 0.15), 0 4px 15px rgba(33, 150, 243, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 30%, #fce4ec 70%, #f3e5f5 100%)',
            position: 'relative'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(156, 39, 176, 0.25), 0 10px 25px rgba(233, 30, 99, 0.15)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(156, 39, 176, 0.15), 0 4px 15px rgba(33, 150, 243, 0.1)';
          }}>
            {/* Floating badge for rating */}
            {product.rating && (
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'linear-gradient(45deg, #ff9800, #e91e63)',
                color: 'white',
                borderRadius: '20px',
                padding: '5px 12px',
                fontSize: '0.8rem',
                fontWeight: '600',
                zIndex: 2,
                boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)'
              }}>
                ⭐ {product.rating.rate}
              </div>
            )}
            
            <img
              className="card-img-top p-3"
              src={product.image}
              alt={product.title}
              height={300}
              style={{
                transition: 'all 0.4s ease',
                borderRadius: '15px',
                filter: 'brightness(1.05) saturate(1.1)'
              }}
            />
            <div className="card-body">
              <h5 className="card-title" style={{
                background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '600',
                fontSize: '1.1rem',
                marginBottom: '10px'
              }}>
                {product.title.substring(0, 12)}...
              </h5>
              <p className="card-text" style={{
                color: '#666',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                marginBottom: '15px'
              }}>
                {product.description.substring(0, 90)}...
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead" style={{
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
                border: 'none',
                background: 'linear-gradient(45deg, #1976d2, #e91e63)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '700',
                fontSize: '1.3rem',
                padding: '15px'
              }}>$ {product.price}</li>
            </ul>
            <div className="card-body">
              <Link to={`/product/${product.id}`} className="btn m-1" style={{
                background: 'linear-gradient(135deg, #2196f3 0%, #9c27b0 50%, #e91e63 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: '500',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden'
              }} onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.5)';
              }} onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }}>
                🛍️ Buy Now
              </Link>
              <button className="btn m-1" style={{
                border: '2px solid transparent',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #9c27b0, #e91e63) border-box',
                color: '#7b1fa2',
                backgroundColor: 'transparent',
                borderRadius: '20px',
                padding: '8px 20px',
                fontWeight: '500',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(45deg, #2196f3, #9c27b0, #e91e63)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.4)';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #9c27b0, #e91e63) border-box';
                e.target.style.color = '#7b1fa2';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }} onClick={() => addProduct(product)}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3" style={{
      background: 'linear-gradient(135deg, #f8fbff 0%, #fce4ec 30%, #f3e5f5 70%, #e3f2fd 100%)',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(156, 39, 176, 0.15), 0 5px 20px rgba(33, 150, 243, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `
          radial-gradient(circle at 25% 25%, rgba(233, 30, 99, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(156, 39, 176, 0.05) 0%, transparent 50%)
        `,
        animation: 'rotate 20s linear infinite',
        zIndex: 0
      }}></div>
      
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="display-5" style={{
            background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '600',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 2
          }}>✨ Latest Products ✨</h2>
          <hr style={{
            border: 'none',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #2196f3, #9c27b0, #e91e63, transparent)',
            margin: '2rem auto',
            width: '150px',
            borderRadius: '2px',
            position: 'relative',
            zIndex: 2
          }} />
          {!walletAddress && (
            <div className="alert mt-2" style={{
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)',
              border: '1px solid rgba(233, 30, 99, 0.3)',
              borderRadius: '15px',
              color: '#c2185b',
              padding: '15px 20px',
              position: 'relative',
              zIndex: 2,
              backdropFilter: 'blur(10px)'
            }}>
              🔗✨ Connect your wallet to unlock exclusive blockchain features and special deals!
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center" style={{ position: 'relative', zIndex: 2 }}>
        {loading ? <Loading /> : <ShowProducts />}
      </div>
      
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
