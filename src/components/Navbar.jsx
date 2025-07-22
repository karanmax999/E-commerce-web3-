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
      background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #e8eaf6 100%)',
      boxShadow: '0 4px 30px rgba(156, 39, 176, 0.15), 0 2px 15px rgba(33, 150, 243, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(156, 39, 176, 0.1)'
    }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/" style={{
          background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          transition: 'all 0.4s ease',
          position: 'relative'
        }}>
          ✨ E-Commerce
        </NavLink>

        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            border: '2px solid rgba(156, 39, 176, 0.3)',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" style={{
                color: '#7b1fa2',
                fontWeight: '500',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                padding: '8px 16px',
                position: 'relative',
                overflow: 'hidden'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(156, 39, 176, 0.1))';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 4px 15px rgba(156, 39, 176, 0.2)';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product" style={{
                color: '#7b1fa2',
                fontWeight: '500',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                padding: '8px 16px'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(156, 39, 176, 0.1))';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 4px 15px rgba(156, 39, 176, 0.2)';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" style={{
                color: '#7b1fa2',
                fontWeight: '500',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                padding: '8px 16px'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(156, 39, 176, 0.1))';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 4px 15px rgba(156, 39, 176, 0.2)';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" style={{
                color: '#7b1fa2',
                fontWeight: '500',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                padding: '8px 16px'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(156, 39, 176, 0.1))';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 4px 15px rgba(156, 39, 176, 0.2)';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>Contact</NavLink>
            </li>
          </ul>

          <div className="buttons text-center">
            <NavLink to="/login" className="btn m-2" style={{
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #9c27b0) border-box',
              color: '#7b1fa2',
              backgroundColor: 'transparent',
              borderRadius: '25px',
              padding: '8px 20px',
              fontWeight: '500',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }} onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #2196f3, #9c27b0)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(156, 39, 176, 0.3)';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #9c27b0) border-box';
              e.target.style.color = '#7b1fa2';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>
            <NavLink to="/register" className="btn m-2" style={{
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #e91e63, #9c27b0) border-box',
              color: '#e91e63',
              backgroundColor: 'transparent',
              borderRadius: '25px',
              padding: '8px 20px',
              fontWeight: '500',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }} onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #e91e63, #9c27b0)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(233, 30, 99, 0.3)';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #e91e63, #9c27b0) border-box';
              e.target.style.color = '#e91e63';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              <i className="fa fa-user-plus mr-1"></i> Register
            </NavLink>
            <NavLink to="/cart" className="btn m-2" style={{
              border: '2px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #7b1fa2) border-box',
              color: '#1976d2',
              backgroundColor: 'transparent',
              borderRadius: '25px',
              padding: '8px 20px',
              fontWeight: '500',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative'
            }} onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #2196f3, #7b1fa2)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(123, 31, 162, 0.3)';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2196f3, #7b1fa2) border-box';
              e.target.style.color = '#1976d2';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}>
              <i className="fa fa-cart-shopping mr-1"></i> Cart 
              <span style={{
                background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 8px',
                fontSize: '0.8rem',
                marginLeft: '5px',
                animation: state.length > 0 ? 'pulse 2s infinite' : 'none'
              }}>({state.length})</span>
            </NavLink>

            {/* 🔌 Web3 Wallet Button */}
            {walletAddress ? (
              <button
                onClick={disconnectWallet}
                className="btn m-2"
                style={{
                  background: 'linear-gradient(135deg, #42a5f5 0%, #9c27b0 50%, #e91e63 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '8px 16px',
                  fontWeight: '500',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(156, 39, 176, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = '0 8px 30px rgba(156, 39, 176, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 20px rgba(156, 39, 176, 0.3)';
                }}
              >
                🔗 {truncateAddress(walletAddress)} | {getReadableNetworkName(network)}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="btn m-2"
                style={{
                  background: 'linear-gradient(135deg, #2196f3 0%, #9c27b0 50%, #e91e63 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '8px 20px',
                  fontWeight: '500',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(156, 39, 176, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = '0 8px 30px rgba(156, 39, 176, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 20px rgba(156, 39, 176, 0.3)';
                }}
                disabled={isConnecting}
              >
                {isConnecting ? '🔄 Connecting...' : '🔌 Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
