import { useContext } from "react";
import { DataContext } from "../../DataContext";

import { ProductInfoGallery } from "./ProductInfoGallery";
import Navbar from "./Navbar";
import ProductCarousel from "./ProductCarousel";
import ProductInfoDesc from "./ProductInfoDesc";

export default function ProductInfo() {
  const ctx = useContext(DataContext);

  const product = ctx.selectedProduct;
  if (product === undefined) {
    return (
      <div className="my-20 pt-16 text-center text-red-500 flex justify-center content-center items-center">
        Product not found
      </div>
    );
  }
  console.log("product: ", product.images);
  return (
    <>
      <div className="my-auto pt-[6rem] flex flex-col lg:flex-row  gap-2 bg-gray-200">
        {/*<-- For bigger screen I have productInfo and for 
        smaller devices we have productCarousel --> */}
        <ProductInfoGallery props={product.images} product={product} />
        <ProductCarousel props={product.images} product={product} />

        {/* <-- Product Description --> */}
        <ProductInfoDesc product={product} />
      </div>
    </>
  );
}
