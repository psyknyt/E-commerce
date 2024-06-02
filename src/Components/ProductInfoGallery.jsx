import React, { useContext } from "react";

import { DataContext } from "../../DataContext";

export function ProductInfoGallery({ props, product }) {
  const ctx = useContext(DataContext);

  const data = props.map((item, index) => ({
    imgelink: item,
  }));

  const [active, setActive] = React.useState(props[0]);

  return (
    // div containing both image and buttons
    <div className="h-screen hidden lg:flex flex-col w-[60%]">
      {/* div containing image gallery */}
      <div className="flex flex-col md:flex-row gap-2 shrink">
        <div className="flex-none hidden md:grid md:grid-rows-5 gap-4 w-[100px] p-2">
          {data.map(({ imgelink }, index) => (
            <div key={index}>
              <img
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className={`${
                  active === imgelink
                    ? "ring-black/30 ring-offset-2 ring-4 "
                    : " border-2 border-rose-600 "
                }h-20  cursor-pointer rounded-lg object-cover object-center`}
                alt="gallery-image"
              />
            </div>
          ))}
        </div>
        <div className="md:shrink w-full ">
          <img
            className="h-full w-full rounded-lg object-contain object-center md:h-[480px]"
            src={active}
            alt=""
          />
        </div>
        <div className="grid grid-cols-5 md:hidden gap-2 md:w-[80px]">
          {data.map(({ imgelink }, index) => (
            <div key={index}>
              <img
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className={`${
                  active === imgelink
                    ? "border-black border-2"
                    : "border-red-200"
                }h-20 max-w-full cursor-pointer rounded-lg object-cover object-center`}
                alt="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
      {/* buttons add to cart and buy now */}
      <div
        className="w-full text-white flex flex-row justify-between items-stretch gap-4 pl-2 py-5 mx-auto"
        onClick={() => ctx.addToCart(product.id)}
      >
        <button className="w-1/2 bg-white text-black py-2 rounded-lg shrink">
          Add to Cart
        </button>
        <button className="w-1/2 bg-white text-black rounded-lg shrink">
          Buy now
        </button>
      </div>
    </div>
  );
}
