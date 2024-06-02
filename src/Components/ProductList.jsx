import React, { useState, useContext, memo, useEffect } from "react";
import { DataContext } from "../../DataContext";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { Spinner, Button } from "@material-tailwind/react";

const ProductList = memo(({}) => {
  const [products, setProducts] = useState([]);
  const ctx = useContext(DataContext);

  useEffect(() => {
    if (ctx?.data?.products) {
      setProducts(ctx.data.products); // Ensure products is an array
    }
    // setCategories(ctx.categories);
  }, [ctx.data]);

  // console.log("products in product list: ", products, ctx);

  const currentPage = ctx.pageNumber || 1;
  const itemsPerPage = 30;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let productsToShow = products.slice(startIndex, endIndex);
  // Slice product list based on current page and items per page

  const filterProducts = products.filter((product) => {
    // Check if the product's category matches any of the selected categories
    return ctx.selectedCategories?.includes(product.category);
  });

  if (filterProducts.length > 0) {
    productsToShow = filterProducts.slice(startIndex, endIndex);
  }
  // console.log("products to show: ", productsToShow);

  return (
    <div>
      {/* loading spinner  */}
      {products.length === 0 && (
        <div className="w-full flex justify-center items-center bg-gradient-to-b pb-10 p-5 text-white text-3xl">
          <Button
            loading={true}
            variant="text"
            className="text-black font-bold"
          >
            Loading
          </Button>
        </div>
      )}
      {/* Product cards.. */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 grid-flow-cols md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mx-auto bg-gradient-to-b from-blue-500 to-blue-300 pb-10 p-5">
          {productsToShow.map((product, index) => (
            <ProductCard props={product} key={index} />
          ))}
        </div>
      )}
      {/* Pagination controls */}
      {ctx.selectedCategories?.length === 0 && <Pagination />}
    </div>
  );
});

export default ProductList;
