import React, { useState, useContext, memo, useEffect } from "react";

import { DataContext } from "../../DataContext";
import ProductCard from "./ProductCard";

import { Spinner, Button } from "@material-tailwind/react";

const ProductList = memo(({ products }) => {
  const ctx = useContext(DataContext);
  const currentPage = ctx.pageNumber;

  const itemsPerPage = 20;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let productsToShow = products?.slice(startIndex, endIndex);
  // Slice product list based on current page and items per page

  const filterProducts = products.filter((product) => {
    // Check if the product's category matches any of the selected categories
    return ctx.selectedCategories.includes(product.category);
  });
  if (filterProducts.length > 0) {
    productsToShow = filterProducts?.slice(startIndex, endIndex);
  }

  return (
    <div>
      {/* Render products */}
      {products.length === 0 && (
        <div className="w-full flex justify-center items-center bg-gradient-to-b   pb-10 p-5 text-white text-3xl">
          <Button
            loading={true}
            variant="text"
            className="text-black font-bold"
          >
            Loading
          </Button>
        </div>
      )}
      {products.length > 0 && (
        <div className="grid grid-cols-1 grid-flow-cols md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mx-auto bg-gradient-to-b from-blue-500 to-blue-300  pb-10 p-5">
          {productsToShow?.map((product, index) => (
            <ProductCard props={product} key={index} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
    </div>
  );
});

export default ProductList;
