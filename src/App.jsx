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
      <div className="w-full  h-screen sm:h-[80vh]  bg-cover bg-center bg-no-repeat flex content-center justify-center bg-gradient-to-b from-blue-500 to-blue-300">
        <Navbar visibility={toggleVisibility} />

        <div className="flex flex-col justify-center items-center text-white relative z-10">
          <div className="mx-auto font-abel text-[32px] md:text-[46px] sm:text-[48px] lg:[72px] w-[70%] text-center">
            Shop whatever you want to, and You can pay later...🥳
          </div>
          <div className="text-[12px] mx-auto w-[50%] text-center my-3">
            We are still under building...
          </div>
          <div className="mx-auto flex justify-around">
            <a
              href="https://twitter.com/psyknyt"
              target="blank"
              rel="noopener noreferrer"
            >
              <button className="bg-white text-black m-2 py-[12px] px-[30px] rounded-full font-roboto text-[16px]">
                Contact Us
              </button>
            </a>
            <a
              href="https://github.com/psyknyt"
              target="blank"
              rel="noopener noreferrer"
            >
              <button className="text-white border-white border-2 m-2 py-[12px] px-[30px] rounded-full font-roboto text-[16px]">
                Learn more
              </button>
            </a>
          </div>
        </div>
        <DrawerCategories text="categories" id="categoryDrawer" />
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
