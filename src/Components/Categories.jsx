import { useEffect, useContext } from "react";
import { DataContext } from "../../DataContext";
import { useNavigate } from "react-router-dom";

import CategroyButton from "./CategoryButton";
import ProductCard from "./ProductCard";
import DrawerCategories from "./Drawer";

export default function Categories() {
  const ctx = useContext(DataContext);

  const filterProducts = ctx?.products.filter((product) => {
    // Check if the product's category matches any of the selected categories
    return ctx.selectedCategories.includes(product.category);
  });

  const navigate = useNavigate();

  let content;
  useEffect(() => {
    if (ctx.selectedCategories?.length === 0) {
      navigate("/");
    } else {
      navigate("/categories");
    }
  }, [ctx.selectedCategories, navigate]);

  if (ctx.selectedCategories?.length > 0) {
    console.log("show products...: ", ctx.selectedCategories.length);
    content = (
      <>
        <div className="flex justify-center text-4xl font-bold text-white py-5">
          Showing for Categories..
        </div>
        <div className="flex  gap-4 my-4 mx-auto px-8 py-5 overflow-x-auto">
          {ctx.selectedCategories?.map((el, index) => (
            <CategroyButton props={el} key={index} />
          ))}
        </div>
        <div className="grid grid-cols-1 grid-flow-cols md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mx-auto bg-black pb-10 p-5">
          {filterProducts?.map((product, index) => (
            <ProductCard props={product} key={index} />
          ))}
        </div>
      </>
    );
  }
  // TODO navigate to / route when selectedCategories are cleared
  else {
    navigate("/");
  }

  return <div className="pt-[200px] bg-black">{content}</div>;
}
