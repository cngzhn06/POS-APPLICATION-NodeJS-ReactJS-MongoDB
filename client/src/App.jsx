import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CartPage from "./components/pages/CartPage";
import InvoicePage from "./components/pages/InvoicePage";
import CustomerPage from "./components/pages/CustomerPage";
import StatitisticPage from "./components/pages/StatitisticPage";
import RegisterPage from "./components/pages/auth/RegisterPage";
import LoginPage from "./components/pages/auth/LoginPage";
import ProductPage from "./components/pages/ProductPage";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouterControl>
                <HomePage />
              </RouterControl>
            }
          />
          <Route
            path="/cart"
            element={
              <RouterControl>
                <CartPage />
              </RouterControl>
            }
          />
          <Route
            path="/invoices"
            element={
              <RouterControl>
                <InvoicePage />
              </RouterControl>
            }
          />
          <Route
            path="/customers"
            element={
              <RouterControl>
                <CustomerPage />
              </RouterControl>
            }
          />
          <Route
            path="/statistic"
            element={
              <RouterControl>
                <StatitisticPage />
              </RouterControl>
            }
          />
          <Route
            path="/products"
            element={
              <RouterControl>
                <ProductPage />
              </RouterControl>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export const RouterControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
