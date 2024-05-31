import React from "react";

import { Rating } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import logo from "../assets/logo.png";
import ProfileImg from "../assets/ProfileImg.png";

import "swiper/css"; // Import Swiper styles
// import "../../node_modules/swiper/css/navigation"; // Import Swiper navigation styles
// import "../../node_modules/swiper/css/pagination"; // Import Swiper pagination styles

const TestimonialCard = ({ review }) => {
  //   console.log("review card: ", review);
  return (
    // <div className="flex justify-center items-center h-screen bg-slate-500 text-center ">
    <div
      className="w-[95%] sm:w-[400px] h-[190px] mx-auto bg-slate-100 rounded-md overflow-hidden flex flex-col justify-between pb-5 relative"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 4px 6px, rgba(0, 0, 0, 0.2) 0px 1px 28px",
      }}
    >
      <div className="h-[%] flex  justify-start items-center gap-3 mt-4 py-5 px-4">
        <img
          src={ProfileImg}
          className="max-w-14 h-14 rounded-full object-cover object-center"
        />
        <div className="flex flex-col ">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm">Name:</p>
            <p className="text-sm">{review.reviewerName}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm">Email:</p>
            <p className="text-sm">{review.reviewerEmail}</p>
          </div>
          <div className="py-2 text-left">
            <div className="flex items-center gap-2">
              <Rating value={Math.floor(review.rating)} readonly />
              {review.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="h-[40px] rounded-b-md place-content-center">
          <span className="w-[80%] mx-auto text-left py-2 rounded-b-md overflow-hidden">
            {review.comment}
          </span>
        </div>
      </div>
    </div>

    // </div>
  );
};

const TestimonialSection = ({ product }) => {
  //   console.log("testimonial section products: ", product);
  return (
    <div className="bg-slate-500 pb-20 h-[80vh]">
      <div className="text-center bg-slate-600 py-10 text-xl font-bold">
        Reviews
      </div>
      <div className="flex  justify-center items-center py-5">
        <Swiper
          spaceBetween={10}
          modules={[Pagination, Autoplay]}
          // pagination={{
          //   clickable: true,
          // }}
          // TODO stopped navigation
          navigation={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          id="commercial"
          // TODO made some changes to the  breakpoints for mobile viewinG
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
        >
          {product.map((item, index) => (
            <SwiperSlide key={index} className="m-3 my-10 mx-auto">
              <TestimonialCard review={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
