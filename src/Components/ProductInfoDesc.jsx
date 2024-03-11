import React from "react";

function ProductInfoDesc({ product }) {
  console.log(product);
  const price = product.price * 84;
  const formattedPrice = price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const dPrice = price - (product.discountPercentage * price) / 100;

  const discountedPrice = dPrice.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  return (
    <>
      <div className="flex flex-col shrink gap-2 h-screen px-5 py-3">
        <div className="text-sm">{`category >> ${product.category}`}</div>
        <div className="text-5xl">{product.title}</div>
        <div className="flex bg-green-600 text-white w-[62px] py-1 px-2 rounded-lg">
          <div>{product.rating}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </div>
        <div className="flex gap-4 items-center top-[9px]">
          <div className="discountedPrice text-green-600">
            {discountedPrice}
          </div>
          <div className="formattedPrice relative">
            <div className="relative text-sm px-1">{formattedPrice}</div>
            <hr className="absolute object-fit w-[100%] left-0 top-[10px] border-black bg-black" />
          </div>
          <div className="text-sm text-green-700">
            {product.discountPercentage}%
          </div>
        </div>
        <div className="text-xl">{product.description}</div>
      </div>
    </>
  );
}

export default ProductInfoDesc;
