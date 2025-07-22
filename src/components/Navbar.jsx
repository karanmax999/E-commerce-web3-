import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWeb3 } from '../web3Context'; // ✅ Web3 context

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const {
    walletAddress,
    connectWallet,
    disconnectWallet,
    network,
    isConnecting,
  } = useWeb3();

  // Truncate wallet address: 0x1234...abcd
  const truncateAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  // Normalize network name display
  const getReadableNetworkName = (networkName) => {
    const knownNetworks = {
      homestead: "Ethereum Mainnet",
      mainnet: "Ethereum Mainnet",
      goerli: "Goerli",
      sepolia: "Sepolia",
      matic: "Polygon",
      mumbai: "Polygon Mumbai",
    };
    return knownNetworks[networkName] || networkName || "Unknown";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          E-Commerce
        </NavLink>

        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>

          <div className="buttons text-center">
            <NavLink to="/login" className="btn btn-outline-dark m-2">
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline-dark m-2">
              <i className="fa fa-user-plus mr-1"></i> Register
            </NavLink>
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
            </NavLink>

            {/* 🔌 Web3 Wallet Button */}
            {walletAddress ? (
              <button
                onClick={disconnectWallet}
                className="btn btn-info m-2"
              >
                {truncateAddress(walletAddress)} | {getReadableNetworkName(network)}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="btn btn-primary m-2"
                disabled={isConnecting}
              >
                {isConnecting ? '🔄 Connecting...' : '🔌 Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
