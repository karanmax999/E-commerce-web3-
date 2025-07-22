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
    background: linear-gradient(135deg, #f8fbff 0%, #e8f4fd 100%) !important;
    min-height: 100vh;
  }
  
  .btn:focus, .btn:active {
    box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25) !important;
  }
  
  .form-control:focus {
    border-color: #2196f3 !important;
    box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25) !important;
  }
  
  .card {
    transition: all 0.3s ease !important;
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
  
  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
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
