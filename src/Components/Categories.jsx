import { useContext } from "react";
import { DataContext } from "../../DataContext";

import CategroyButton from "./CategoryButton";
import ProductCard from "./ProductCard";

export default function Categories() {
  const ctx = useContext(DataContext);

  const filterProducts = ctx.products.filter((product) => {
    // Check if the product's category matches any of the selected categories
    return ctx.selectedCategories.includes(product.category);
  });

  return (
    <div className="  bg-black">
      <div className="flex justify-center text-4xl font-bold text-white py-5">
        Showing for Categories..
      </div>
      <div className="flex justify-evenly gap-4 my-4 mx-auto py-5 overflow-x-auto">
        {ctx.selectedCategories.map((el, index) => (
          <CategroyButton props={el} key={index} />
        ))}
      </div>
      <div className="grid grid-cols-1 grid-flow-cols md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mx-auto bg-gradient-to-b  pb-10 p-5">
        {filterProducts?.map((product, index) => (
          <ProductCard props={product} key={index} />
        ))}
      </div>
    </div>
  );
}
