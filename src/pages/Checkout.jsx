import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useWeb3 } from "../web3Context"; // ✅ Hook to get provider & wallet

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const { walletAddress, provider } = useWeb3();

  const [txStatus, setTxStatus] = useState("idle"); // idle | pending | success | error
  const [txError, setTxError] = useState("");

  const simulateTransaction = async () => {
    if (!provider) {
      toast.error("Connect your wallet first!");
      return;
    }

    try {
      setTxStatus("pending");
      setTxError("");
      toast.loading("Please confirm in wallet...");

      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: walletAddress,
        value: ethers.utils.parseEther("0.001"),
      });

      toast.dismiss();
      toast("Transaction submitted. Awaiting confirmation...");

      await tx.wait();
      setTxStatus("success");
      toast.success("✅ Purchase complete!");
    } catch (err) {
      setTxStatus("error");
      toast.dismiss();
      toast.error("Transaction failed or was rejected.");
      setTxError(err.message || "Unknown error");
    }
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i>Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
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
                    Products ({totalItems})
                    <span style={{ 
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
                    <strong style={{ 
                      background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: '1.1rem'
                    }}>Total</strong>
                    <strong style={{ 
                      background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: '1.3rem'
                    }}>${Math.round(subtotal + shipping)}</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              {/* ✅ Purchase Button */}
              <button
                className="btn w-100"
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
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 40px rgba(156, 39, 176, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 6px 25px rgba(156, 39, 176, 0.4)';
                }}
                onClick={simulateTransaction}
                disabled={txStatus === "pending"}
              >
                {txStatus === "pending"
                  ? "🔄 Processing..."
                  : "💎 Confirm Purchase (0.001 ETH)"}
              </button>

              {/* ✅ Success or Error UI feedback */}
              {txStatus === "success" && (
                <div className="alert mt-3" style={{
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)',
                  border: '2px solid rgba(76, 175, 80, 0.3)',
                  borderRadius: '15px',
                  color: '#2e7d32',
                  padding: '15px 20px',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.2)'
                }}>
                  🎉✨ Transaction successful! Welcome to the future of shopping! 🚀
                </div>
              )}
              {txStatus === "error" && (
                <div className="alert mt-3" style={{
                  background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)',
                  border: '2px solid rgba(244, 67, 54, 0.3)',
                  borderRadius: '15px',
                  color: '#c62828',
                  padding: '15px 20px',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(244, 67, 54, 0.2)'
                }}>
                  ❌💔 Transaction failed: {txError}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            {/* YOUR FORM layout remains unchanged (optional) */}
            <div className="card" style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 8px 30px rgba(156, 39, 176, 0.15)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 30%, #fce4ec 70%, #f3e5f5 100%)'
            }}>
              <div className="card-header py-3" style={{
                background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #fce4ec 100%)',
                border: 'none',
                borderRadius: '20px 20px 0 0'
              }}>
                <h4 className="mb-0" style={{
                  background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '600'
                }}>💳 Billing Address</h4>
              </div>
              <div className="card-body" style={{ padding: '2rem' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ color: '#7b1fa2', fontWeight: '600' }}>
                      👤 Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      style={{
                        border: '2px solid rgba(156, 39, 176, 0.2)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ color: '#7b1fa2', fontWeight: '600' }}>
                      📧 Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      style={{
                        border: '2px solid rgba(156, 39, 176, 0.2)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label" style={{ color: '#7b1fa2', fontWeight: '600' }}>
                      🏠 Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your address"
                      style={{
                        border: '2px solid rgba(156, 39, 176, 0.2)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" style={{ color: '#7b1fa2', fontWeight: '600' }}>
                      🏙️ City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      style={{
                        border: '2px solid rgba(156, 39, 176, 0.2)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" style={{ color: '#7b1fa2', fontWeight: '600' }}>
                      🌍 State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      style={{
                        border: '2px solid rgba(156, 39, 176, 0.2)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" style={{ color: '#7b1fa2', fontWeight: '600' }}>
                      📮 ZIP Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ZIP"
                      style={{
                        border: '2px solid rgba(156, 39, 176, 0.2)',
                        borderRadius: '15px',
                        padding: '12px 20px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            radial-gradient(circle at 25% 75%, rgba(233, 30, 99, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(156, 39, 176, 0.05) 0%, transparent 50%)
          `,
          animation: 'float 10s ease-in-out infinite',
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
        }}>🛒✨ Checkout</h1>
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
          {state.length ? <ShowCheckout /> : <EmptyCart />}
        </div>
        
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-8px) rotate(0.5deg); }
            66% { transform: translateY(4px) rotate(-0.5deg); }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
