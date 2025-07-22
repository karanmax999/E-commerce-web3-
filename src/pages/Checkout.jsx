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
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})
                    <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <strong>Total</strong>
                    <strong>${Math.round(subtotal + shipping)}</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              {/* ✅ Purchase Button */}
              <button
                className="btn btn-primary w-100"
                onClick={simulateTransaction}
                disabled={txStatus === "pending"}
              >
                {txStatus === "pending"
                  ? "Processing..."
                  : "Confirm Purchase (0.001 ETH)"}
              </button>

              {/* ✅ Success or Error UI feedback */}
              {txStatus === "success" && (
                <div className="alert alert-success mt-3">
                  🎉 Transaction successful!
                </div>
              )}
              {txStatus === "error" && (
                <div className="alert alert-danger mt-3">
                  ❌ Transaction failed: {txError}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            {/* YOUR FORM layout remains unchanged (optional) */}
            <div className="card">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>
              <div className="card-body">Your form elements here...</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
