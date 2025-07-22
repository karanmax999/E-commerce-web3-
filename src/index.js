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
