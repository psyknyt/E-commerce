import { useContext, useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import { DataContext } from "../../DataContext";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import AuthContext from "../../AuthContext";

export default function ProductCard({ props }) {
  const ctx = useContext(DataContext);
  const authCtx = useContext(AuthContext);

  const price = props.price * 84;
  const formattedPrice = price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const dPrice = price - (props.discountPercentage * price) / 100;

  const discountedPrice = dPrice.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const profileMenuItems = [
    {
      label: "My Cart",
      icon: ShoppingCartIcon,
    },
  ];
  const navigate = useNavigate();

  const handleSelectedProject = (e) => {
    if (e.target.getAttribute("id") === "btn") {
      return;
    } else {
      ctx.setSelectedProduct(props.id);
      navigate("/productInfo");
    }
  };

  const handleWishlist = (ev) => {
    if (authCtx.token === null) {
      alert("you need to sign in first");
      return;
    }
    ctx.handleWishlist(ev, ctx.user.id, props.id);
  };

  return (
    <div
      className="w-[98%]  mx-auto bg-gray-50 rounded-lg hover:bg-gray-200 hover:text-white animate__animated animate__fadeInDown"
      data-aos="fade-up"
      onClick={handleSelectedProject}
    >
      <CardHeader shadow={false} floated={false} className="h-64">
        <img
          src={props.images[0]}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="">
        {/* brand name and price */}
        <div className="mb-2 flex items-center justify-between">
          <Typography
            color="blue-gray"
            variant="lead"
            className="font-bold truncate uppercase"
          >
            {props.title}
          </Typography>
          <div className="relative  px-5">
            <Typography
              color="green"
              variant="small"
              className="absolute font-bold bottom-5 mx-auto left-[23px]"
            >
              {discountedPrice}
            </Typography>
            <hr className="absolute object-fit w-[75%] left-[15px] top-[13px] border-black bg-black" />
            <Typography color="blue-gray" className="relative ">
              {formattedPrice}
            </Typography>
          </div>
        </div>
        {/* product description */}
        <Typography
          variant="small"
          color="black"
          className="font-normal opacity-75 truncate"
        >
          {props.description}
        </Typography>
        {/* product rating and wish-list*/}
        <div className="flex items-center justify-between content-center gap-2 mt-2 text-blue-gray-500">
          <div className="flex items-center gap-2">
            <Rating value={Math.floor(props.rating)} readonly />
            {props.rating}
          </div>

          <div className="relative inline-flex items-center gap-2 ">
            <Popover>
              <PopoverHandler>
                <input
                  type="checkbox"
                  className="absolute opacity-0 w-6 h-6"
                  id="btn"
                  onChange={(e) => handleWishlist(e)}
                />
              </PopoverHandler>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  ctx.wishlist.find((el) => el === props.id)
                    ? "#D24545"
                    : "#FCF5ED"
                }
                viewBox="0 0 24 24"
                strokeWidth={
                  ctx.wishlist.find((el) => el === props.id) ? 0.2 : 0.8
                }
                stroke="currentColor"
                className="z-1 w-6 h-6 transition ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <PopoverContent>Added to wishlist</PopoverContent>
            </Popover>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex">
        {/* <Typography color="blue-gray" className="font-medium">
          {props.rating}
        </Typography> */}

        <Button
          ripple={false}
          fullWidth={true}
          onClick={() => ctx.addToCart(props.id)}
          id="btn"
          className="add-to-cart bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </div>
  );
}
