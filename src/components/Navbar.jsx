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
    <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top" style={{
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      boxShadow: '0 2px 20px rgba(33, 150, 243, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/" style={{
          color: '#1565c0',
          textShadow: '0 1px 3px rgba(21, 101, 192, 0.2)',
          transition: 'all 0.3s ease'
        }}>
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
              <NavLink className="nav-link" to="/" style={{
                color: '#1976d2',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                padding: '8px 16px'
              }} onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(25, 118, 210, 0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }} onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product" style={{
                color: '#1976d2',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                padding: '8px 16px'
              }} onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(25, 118, 210, 0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }} onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" style={{
                color: '#1976d2',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                padding: '8px 16px'
              }} onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(25, 118, 210, 0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }} onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" style={{
                color: '#1976d2',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                padding: '8px 16px'
              }} onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(25, 118, 210, 0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }} onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>Contact</NavLink>
            </li>
          </ul>

          <div className="buttons text-center">
            <NavLink to="/login" className="btn m-2" style={{
              border: '2px solid #2196f3',
              color: '#2196f3',
              backgroundColor: 'transparent',
              borderRadius: '25px',
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
            }}>
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>
            <NavLink to="/register" className="btn m-2" style={{
              border: '2px solid #2196f3',
              color: '#2196f3',
              backgroundColor: 'transparent',
              borderRadius: '25px',
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
            }}>
              <i className="fa fa-user-plus mr-1"></i> Register
            </NavLink>
            <NavLink to="/cart" className="btn m-2" style={{
              border: '2px solid #2196f3',
              color: '#2196f3',
              backgroundColor: 'transparent',
              borderRadius: '25px',
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
            }}>
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
            </NavLink>

            {/* 🔌 Web3 Wallet Button */}
            {walletAddress ? (
              <button
                onClick={disconnectWallet}
                className="btn m-2"
                style={{
                  background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '8px 16px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(33, 150, 243, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 20px rgba(33, 150, 243, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(33, 150, 243, 0.2)';
                }}
              >
                {truncateAddress(walletAddress)} | {getReadableNetworkName(network)}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="btn m-2"
                style={{
                  background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '8px 20px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(33, 150, 243, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 20px rgba(33, 150, 243, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(33, 150, 243, 0.2)';
                }}
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
