import React, { useState, useContext, memo, useEffect } from "react";

import { DataContext } from "../../DataContext";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const ProductList = memo(() => {
  const [visib, setVisibility] = useState(false);
  const [productList, setProduct] = useState(undefined);

  // const [currentPage, setCurrentPage] = useState(1);
  const ctx = useContext(DataContext);
  const currentPage = ctx.pageNumber;

  const itemsPerPage = 20;
  // const productList = ctx?.products;s
  useEffect(() => {
    if (ctx?.products) {
      setProduct(ctx.products);
      console.log("type of product list is: ", typeof productList);
      console.log();
    }
  }, [ctx.products]);
  // Calculate start and end index of products to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice product list based on current page and items per page
  const productsToShow = productList?.slice(startIndex, endIndex);

  return (
    <div>
      {/* Render products */}
      <div className="grid grid-cols-1 grid-flow-cols md:grid-cols-2 xl:grid-cols-3 gap-4 w-[90%] mx-auto bg-gradient-to-b from-blue-500 to-blue-300">
        {productList &&
          productsToShow?.map((product, index) => (
            <ProductCard props={product} key={index} />
          ))}
      </div>

      {/* Pagination controls */}
      <Pagination />
      {/* <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={endIndex >= productList.length}>
          Next
        </button>
      </div> */}
    </div>
  );
});

export default ProductList;
