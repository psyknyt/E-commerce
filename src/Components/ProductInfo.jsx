import { useContext, useEffect } from "react";
import { DataContext } from "../../DataContext";

import { ProductInfoGallery } from "./ProductInfoGallery";
import Navbar from "./Navbar";
import ProductCarousel from "./ProductCarousel";
import ProductInfoDesc from "./ProductInfoDesc";
import TestimonialSection from "./Reviews";

export default function ProductInfo() {
  const ctx = useContext(DataContext);

  const product = ctx.selectedProduct;
  // console.log("selected product is: ", product);
  if (product === undefined) {
    return (
      <div className="h-[80vh] my-20 pt-16 text-center text-red-500 flex justify-center content-center items-center">
        Product not found
      </div>
    );
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="my-auto flex flex-col lg:flex-row  gap-2 bg-gray-200">
        {/*<-- For bigger screen I have productInfo and for 
        smaller devices we have productCarousel --> */}

        {product.images.length > 1 && (
          <ProductCarousel props={product.images} product={product} />
        )}
        {product.images.length > 1 && (
          <ProductInfoGallery props={product.images} product={product} />
        )}

        {product.images.length === 1 && (
          <div className="w-full ">
            <img
              className="h-[60%] w-full rounded-lg object-contain object-center"
              src={product.images}
              alt="product images"
            />
          </div>
        )}

        {/* <-- Product Description --> */}
        <ProductInfoDesc product={product} />
      </div>
      <TestimonialSection product={product.reviews} />
    </>
  );
}
