import { useState, useContext, useEffect } from "react";

import Navbar from "./Components/Navbar";
import ProductCard from "./Components/ProductCard";
import { DataContext } from "../DataContext";

import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const ctx = useContext(DataContext);

  useEffect(() => {
    setProduct(ctx?.products);
    console.log("product is: ", product);
  }, [ctx]);

  return (
    <>
      <div className="w-full  h-screen  bg-cover bg-center bg-no-repeat flex justify-center bg-gradient-to-b from-blue-500 to-blue-300">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 grid-flow-cols md:grid-cols-2 xl:grid-cols-3 gap-4 w-[90%] mx-auto">
        {product?.length > 0 &&
          product.map((el, i) => <ProductCard props={el} key={i} />)}
      </div>
    </>
  );
}

export default App;
