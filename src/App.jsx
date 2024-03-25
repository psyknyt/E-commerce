import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { DataContext } from "../DataContext";

import Categories from "./Components/Categories";
import Cart from "./Components/Cart";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ProductInfo from "./Components/ProductInfo";
import Nav from "./Components/Navbar";
import { Footer } from "./Components/Footer";

function App() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const ctx = useContext(DataContext);

  useEffect(() => {
    if (ctx.data?.products) {
      setProduct(ctx.data.products);
      // console.log("product updated: ", product);
    }
    setCategories(ctx.categories);
  }, [ctx.data]);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/categories");
  }, [ctx.selectedCategories]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productInfo" element={<ProductInfo />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
