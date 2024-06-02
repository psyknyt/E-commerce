import { useContext } from "react";
import { DataContext } from "../../DataContext";

import { Carousel } from "@material-tailwind/react";

export default function ProductCarousel({ props, product }) {
  const ctx = useContext(DataContext);

  return (
    <div className="flex lg:hidden flex-col overflow-hidden ">
      <Carousel
        loop="true"
        autoplay="true"
        autoplayDelay={3000}
        className="rounded-xl max-h-[260px] sm:max-h-[400px] overflow-hidden bg-blue-gray-300"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-[1rem] sm:botton-[2rem] left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {props.map((image, index) => (
          <div key={index} className="w-full h-full">
            <img
              id="carousel"
              src={image}
              alt={`image ${index + 1}`}
              className="h-full w-full object-contain object-center "
            />
          </div>
        ))}
      </Carousel>
      <div className=" text-white flex flex-row justify-between  gap-4 px-5 py-5 mx-auto shrink w-full">
        <button
          className="w-1/2 bg-white text-black py-2 rounded-lg shrink"
          onClick={() => ctx.addToCart(product.id)}
        >
          Add to Cart
        </button>
        <button className="w-1/2 bg-white text-black rounded-lg shrink">
          Buy now
        </button>
      </div>
    </div>
  );
}
