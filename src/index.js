import React from "react";
import ReactDOM from "react-dom/client";

// CSS imports
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// React dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// Redux store
import store from "./redux/store";

// Pages
import {
  Home,
  ProductPage,
  ProductsPage,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";

// Components
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

// ✅ Import the Web3Provider
import { Web3Provider } from "./web3Context";

// Add global styles for the light blue theme
const globalStyles = `
  body {
    background: linear-gradient(135deg, #f8fbff 0%, #fce4ec 30%, #f3e5f5 70%, #e8f4fd 100%) !important;
    min-height: 100vh;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }
  
  .btn:focus, .btn:active {
    box-shadow: 0 0 0 0.2rem rgba(156, 39, 176, 0.25) !important;
  }
  
  .form-control:focus {
    border-color: #9c27b0 !important;
    box-shadow: 0 0 0 0.2rem rgba(156, 39, 176, 0.25) !important;
  }
  
  .card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  .form-range::-webkit-slider-thumb {
    background: linear-gradient(45deg, #9c27b0, #e91e63) !important;
  }
  
  .form-range::-moz-range-thumb {
    background: linear-gradient(45deg, #9c27b0, #e91e63) !important;
    border: none !important;
  }
  
  .form-select:focus {
    border-color: #9c27b0 !important;
    box-shadow: 0 0 0 0.2rem rgba(156, 39, 176, 0.25) !important;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: linear-gradient(135deg, #f8fbff, #fce4ec);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #2196f3, #9c27b0, #e91e63);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #1976d2, #7b1fa2, #c2185b);
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0, -10px, 0);
    }
    70% {
      transform: translate3d(0, -5px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }
  
  .slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }
  
  .slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }
  
  .bounce {
    animation: bounce 2s infinite;
  }
  
  /* Loading shimmer effect */
  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }
  
  /* Glassmorphism effect */
  .glass {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  /* Gradient text utility */
  .gradient-text {
    background: linear-gradient(45deg, #2196f3, #9c27b0, #e91e63);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  /* Enhanced button hover effects */
  .btn-gradient {
    background: linear-gradient(45deg, #2196f3, #9c27b0, #e91e63);
    border: none;
    color: white;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .btn-gradient:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(156, 39, 176, 0.4);
  }
`;

// Inject global styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/product/*" element={<PageNotFound />} />
            </Routes>
            <Toaster />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </Web3Provider>
  </React.StrictMode>
);
