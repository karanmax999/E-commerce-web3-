import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5"> Your Cart is Empty </h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3" style={{
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #fce4ec 100%)',
                    border: 'none',
                    borderRadius: '15px 15px 0 0'
                  }}>
                    <h5 className="mb-0" style={{
                      background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '600'
                    }}>Item List</h5>
                  </div>
                  <div className="card-body" style={{
                    background: 'white',
                    borderRadius: '0 0 15px 15px',
                    boxShadow: '0 8px 25px rgba(156, 39, 176, 0.15)'
                  }}>
                    {state.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                                style={{
                                  borderRadius: '15px',
                                  overflow: 'hidden',
                                  boxShadow: '0 4px 15px rgba(156, 39, 176, 0.1)'
                                }}
                              >
                                <img
                                  src={item.image}
                                  // className="w-100"
                                  alt={item.title}
                                  width={100}
                                  height={75}
                                  style={{
                                    borderRadius: '15px',
                                    filter: 'brightness(1.05) saturate(1.1)'
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p style={{
                                color: '#7b1fa2',
                                fontWeight: '600',
                                fontSize: '1.1rem'
                              }}>
                                <strong>{item.title}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn px-3"
                                  style={{
                                    background: 'linear-gradient(45deg, #f5f5f5, #fce4ec)',
                                    border: '2px solid rgba(156, 39, 176, 0.2)',
                                    borderRadius: '10px',
                                    color: '#7b1fa2',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: '600'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'linear-gradient(45deg, #e91e63, #9c27b0)';
                                    e.target.style.color = 'white';
                                    e.target.style.borderColor = '#e91e63';
                                    e.target.style.transform = 'scale(1.1)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.3)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'linear-gradient(45deg, #f5f5f5, #fce4ec)';
                                    e.target.style.color = '#7b1fa2';
                                    e.target.style.borderColor = 'rgba(156, 39, 176, 0.2)';
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = 'none';
                                  }}
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5" style={{
                                  background: 'linear-gradient(45deg, #1976d2, #7b1fa2)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  fontWeight: '700',
                                  fontSize: '1.1rem',
                                  margin: 'auto',
                                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                }}>{item.qty}</p>

                                <button
                                  className="btn px-3"
                                  style={{
                                    background: 'linear-gradient(45deg, #f5f5f5, #e8f5e8)',
                                    border: '2px solid rgba(76, 175, 80, 0.2)',
                                    borderRadius: '10px',
                                    color: '#4caf50',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: '600'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'linear-gradient(45deg, #4caf50, #66bb6a)';
                                    e.target.style.color = 'white';
                                    e.target.style.borderColor = '#4caf50';
                                    e.target.style.transform = 'scale(1.1)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'linear-gradient(45deg, #f5f5f5, #e8f5e8)';
                                    e.target.style.color = '#4caf50';
                                    e.target.style.borderColor = 'rgba(76, 175, 80, 0.2)';
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = 'none';
                                  }}
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span style={{ 
                                    background: 'linear-gradient(45deg, #666, #7b1fa2)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                  }}>{item.qty}</span>{" "}
                                  x <span style={{ 
                                    background: 'linear-gradient(45deg, #1976d2, #e91e63)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontSize: '1.1rem'
                                  }}>${item.price}</span>
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" style={{
                            border: 'none',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(156, 39, 176, 0.3), rgba(233, 30, 99, 0.3), transparent)'
                          }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3" style={{
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #fce4ec 100%)',
                    border: 'none',
                    borderRadius: '15px 15px 0 0'
                  }}>
                    <h5 className="mb-0" style={{
                      background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '600'
                    }}>Order Summary</h5>
                  </div>
                  <div className="card-body" style={{
                    background: 'white',
                    borderRadius: '0 0 15px 15px',
                    boxShadow: '0 8px 25px rgba(156, 39, 176, 0.15)'
                  }}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0" style={{
                        backgroundColor: 'transparent',
                        color: '#666'
                      }}>
                        Products ({totalItems})<span style={{ 
                          background: 'linear-gradient(45deg, #1976d2, #7b1fa2)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontWeight: '700',
                          fontSize: '1.1rem'
                        }}>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{
                        backgroundColor: 'transparent',
                        color: '#666'
                      }}>
                        Shipping
                        <span style={{ 
                          background: 'linear-gradient(45deg, #1976d2, #7b1fa2)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontWeight: '700',
                          fontSize: '1.1rem'
                        }}>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3" style={{
                        backgroundColor: 'transparent'
                      }}>
                        <div>
                          <strong style={{ 
                            background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '1.1rem'
                          }}>Total amount</strong>
                        </div>
                        <span>
                          <strong style={{ 
                            background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '1.3rem'
                          }}>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-lg btn-block"
                      style={{
                        background: 'linear-gradient(135deg, #2196f3 0%, #9c27b0 50%, #e91e63 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '15px 30px',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 6px 25px rgba(156, 39, 176, 0.4)',
                        textDecoration: 'none',
                        display: 'block',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px) scale(1.02)';
                        e.target.style.boxShadow = '0 12px 40px rgba(156, 39, 176, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 6px 25px rgba(156, 39, 176, 0.4)';
                      }}
                    >
                      🚀 Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3" style={{
        background: 'linear-gradient(135deg, #f8fbff 0%, #fce4ec 30%, #f3e5f5 70%, #e3f2fd 100%)',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(156, 39, 176, 0.15), 0 5px 20px rgba(33, 150, 243, 0.1)',
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(233, 30, 99, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.05) 0%, transparent 50%)
          `,
          animation: 'float 8s ease-in-out infinite',
          zIndex: 0
        }}></div>
        
        <h1 className="text-center" style={{
          background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '600',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 2
        }}>🛒 Shopping Cart</h1>
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
        <div style={{ position: 'relative', zIndex: 2 }}>
          {state.length > 0 ? <ShowCart /> : <EmptyCart />}
        </div>
        
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
