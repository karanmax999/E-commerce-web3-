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
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    border: 'none',
                    borderRadius: '15px 15px 0 0'
                  }}>
                    <h5 className="mb-0" style={{
                      color: '#1565c0',
                      fontWeight: '600'
                    }}>Item List</h5>
                  </div>
                  <div className="card-body" style={{
                    background: 'white',
                    borderRadius: '0 0 15px 15px',
                    boxShadow: '0 5px 15px rgba(33, 150, 243, 0.1)'
                  }}>
                    {state.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item.image}
                                  // className="w-100"
                                  alt={item.title}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
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
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '10px',
                                    color: '#666',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#2196f3';
                                    e.target.style.color = 'white';
                                    e.target.style.borderColor = '#2196f3';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#f5f5f5';
                                    e.target.style.color = '#666';
                                    e.target.style.borderColor = '#e0e0e0';
                                  }}
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5" style={{
                                  color: '#1976d2',
                                  fontWeight: '600',
                                  fontSize: '1.1rem',
                                  margin: 'auto'
                                }}>{item.qty}</p>

                                <button
                                  className="btn px-3"
                                  style={{
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '10px',
                                    color: '#666',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#2196f3';
                                    e.target.style.color = 'white';
                                    e.target.style.borderColor = '#2196f3';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#f5f5f5';
                                    e.target.style.color = '#666';
                                    e.target.style.borderColor = '#e0e0e0';
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
                                  <span style={{ color: '#666' }}>{item.qty}</span>{" "}
                                  x <span style={{ color: '#1976d2' }}>${item.price}</span>
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" style={{
                            border: 'none',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.3), transparent)'
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
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    border: 'none',
                    borderRadius: '15px 15px 0 0'
                  }}>
                    <h5 className="mb-0" style={{
                      color: '#1565c0',
                      fontWeight: '600'
                    }}>Order Summary</h5>
                  </div>
                  <div className="card-body" style={{
                    background: 'white',
                    borderRadius: '0 0 15px 15px',
                    boxShadow: '0 5px 15px rgba(33, 150, 243, 0.1)'
                  }}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0" style={{
                        backgroundColor: 'transparent',
                        color: '#666'
                      }}>
                        Products ({totalItems})<span style={{ color: '#1976d2', fontWeight: '600' }}>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{
                        backgroundColor: 'transparent',
                        color: '#666'
                      }}>
                        Shipping
                        <span style={{ color: '#1976d2', fontWeight: '600' }}>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3" style={{
                        backgroundColor: 'transparent'
                      }}>
                        <div>
                          <strong style={{ color: '#1565c0' }}>Total amount</strong>
                        </div>
                        <span>
                          <strong style={{ color: '#1565c0', fontSize: '1.2rem' }}>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-lg btn-block"
                      style={{
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '15px 30px',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
                        textDecoration: 'none',
                        display: 'block',
                        textAlign: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 8px 30px rgba(33, 150, 243, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 20px rgba(33, 150, 243, 0.3)';
                      }}
                    >
                      Go to checkout
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
        background: 'linear-gradient(135deg, #f8fbff 0%, #e3f2fd 100%)',
        borderRadius: '20px',
        boxShadow: '0 5px 25px rgba(33, 150, 243, 0.1)',
        minHeight: '80vh'
      }}>
        <h1 className="text-center" style={{
          color: '#1565c0',
          fontWeight: '600',
          marginBottom: '1rem',
          textShadow: '0 1px 3px rgba(21, 101, 192, 0.2)'
        }}>Cart</h1>
        <hr style={{
          border: 'none',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
          margin: '2rem auto',
          width: '100px',
          borderRadius: '2px'
        }} />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
