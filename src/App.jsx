import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { DataContext } from "../DataContext";

import ProductCard from "./Components/ProductCard";
import Pagination from "./Components/Pagination";
import ProductList from "./Components/ProductList";

import Categories from "./Components/Categories";
import Cart from "./Components/Cart";

import DrawerCategories from "./Components/Drawer";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ErrorPage from "./Components/ErrorPage";
import ProductInfo from "./Components/ProductInfo";

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
      {/* <Categories /> */}
      {/* <Cart /> */}
    </>
  );
}

export default App;
