import { useState, useContext, useEffect } from "react";

import Navbar from "./Components/Navbar";
import ProductCard from "./Components/ProductCard";
import { DataContext } from "../DataContext";
import Pagination from "./Components/Pagination";
import ProductList from "./Components/ProductList";

import DrawerCategories from "./Components/Drawer";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const ctx = useContext(DataContext);

  useEffect(() => {
    if (ctx.data?.products) {
      setProduct(ctx.data.products);
      console.log("product updated: ", product);
    }
    setCategories(ctx.categories);
  }, [ctx.data]);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <>
      <div className="w-full  h-screen  bg-cover bg-center bg-no-repeat flex justify-center bg-gradient-to-b from-blue-500 to-blue-300">
        <Navbar visibility={toggleVisibility} />
        {visibility && (
          <DrawerCategories text="categories" id="categoryDrawer" />
        )}
      </div>
      <ProductList products={product} />
      {/* <div className="grid grid-cols-1 grid-flow-cols md:grid-cols-2 xl:grid-cols-3 gap-4 w-[90%] mx-auto bg-gradient-to-b from-blue-500 to-blue-300">
        {product?.length > 0 &&
          product.map((el, i) => <ProductCard props={el} key={i} />)}
      </div> */}
      {/* <Pagination /> */}
    </>
  );
}

export default App;
