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
                    Products ({totalItems})
                    <span style={{ color: '#1976d2', fontWeight: '600' }}>${Math.round(subtotal)}</span>
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
                    <strong style={{ color: '#1565c0' }}>Total</strong>
                    <strong style={{ color: '#1565c0', fontSize: '1.2rem' }}>${Math.round(subtotal + shipping)}</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              {/* ✅ Purchase Button */}
              <button
                className="btn w-100"
                style={{
                  background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '15px 30px',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(33, 150, 243, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(33, 150, 243, 0.3)';
                }}
                onClick={simulateTransaction}
                disabled={txStatus === "pending"}
              >
                {txStatus === "pending"
                  ? "Processing..."
                  : "Confirm Purchase (0.001 ETH)"}
              </button>

              {/* ✅ Success or Error UI feedback */}
              {txStatus === "success" && (
                <div className="alert mt-3" style={{
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  borderRadius: '15px',
                  color: '#2e7d32',
                  padding: '15px 20px'
                }}>
                  🎉 Transaction successful!
                </div>
              )}
              {txStatus === "error" && (
                <div className="alert mt-3" style={{
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  borderRadius: '15px',
                  color: '#c62828',
                  padding: '15px 20px'
                }}>
                  ❌ Transaction failed: {txError}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            {/* YOUR FORM layout remains unchanged (optional) */}
            <div className="card" style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 5px 25px rgba(33, 150, 243, 0.1)',
              background: 'white'
            }}>
              <div className="card-header py-3" style={{
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                border: 'none',
                borderRadius: '20px 20px 0 0'
              }}>
                <h4 className="mb-0" style={{
                  color: '#1565c0',
                  fontWeight: '600'
                }}>Billing address</h4>
              </div>
              <div className="card-body" style={{
                padding: '2rem'
              }}>Your form elements here...</div>
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
        }}>Checkout</h1>
        <hr style={{
          border: 'none',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #2196f3, transparent)',
          margin: '2rem auto',
          width: '100px',
          borderRadius: '2px'
        }} />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
