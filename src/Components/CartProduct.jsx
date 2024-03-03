import { useContext, useState } from "react";
import { DataContext } from "../../DataContext";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  CardFooter,
  Rating,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

export default function CartProduct({ props, index }) {
  const ctx = useContext(DataContext);
  const cart = [...ctx?.cart];
  const price = cart[index]?.price * 84;

  const [quantity, setQuantity] = useState(ctx.cart[index].quantity);

  const dPrice =
    cart[index].quantity *
    (price - (cart[index]?.discountPercentage * price) / 100);

  const discount = price - dPrice;
  // adding amount to cart's product object as a new key value pair
  ctx.cart[index].amount = dPrice;
  ctx.cart[index].discount = discount;

  const formattedPrice = dPrice.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  // increasing or decreasing the quantities and updating the cart as well
  // here I'm using useState to re-Render the component

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    ctx.cart[index].quantity += 1;
  };

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
    ctx.cart[index].quantity -= 1;
  };

  return (
    <Card className="w-full sm:max-w-[48rem] flex-col md:flex-row gap-4 justify-center  bg-gray-50 mb-5">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full md:w-2/6 shrink-0 md:rounded-r-none "
      >
        <img
          src={cart[index].images[0]}
          alt="card-image"
          className="h-full w-full max-h-[300px] object-cover object-center"
        />
      </CardHeader>
      <CardBody className="flex content-center flex-col gap-2 md:gap-4 w-full">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {cart[index].title}
        </Typography>
        <Typography color="gray" className=" font-normal ">
          {cart[index].description}
        </Typography>
        <div className="flex items-center justify-between content-center gap-2  text-blue-gray-500 py-2 md:py-4">
          <div className="flex items-center gap-2">
            <Rating value={Math.floor(cart[index].rating)} readonly />
            {cart[index].rating}
          </div>
          <div className="relative inline-flex items-center gap-2">
            <Popover>
              <PopoverHandler>
                <input
                  type="checkbox"
                  className="absolute opacity-0 w-6 h-6"
                  onChange={(ev) => ctx.handleWishlist(ev, props.id)}
                />
              </PopoverHandler>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  ctx.wishlist.find((el) => el.id === props.id)
                    ? "#D24545"
                    : "#FCF5ED"
                }
                viewBox="0 0 24 24"
                strokeWidth={
                  ctx.wishlist.find((el) => el.id === props.id) ? 0.2 : 0.8
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
        {/* amount and rating for bigger and smaller devices */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div>Quantity:</div>
            <div className="bg-gray-600 rounded-md">
              <button
                onClick={decreaseQuantity}
                className="px-2 text-white"
                disabled={cart[index].quantity === 1}
              >
                -
              </button>
              <input
                type="text"
                placeholder={cart[index].quantity}
                readOnly
                className="border-[1px] border-gray-500 w-10 text-center rounded-sm placeholder:text-black "
              />
              <button onClick={increaseQuantity} className="px-2 text-white">
                +
              </button>
            </div>
          </div>
          <div>Amount: {formattedPrice}</div>
        </div>
        <div className="flex justify-between md:hidden py-2">
          <div className="flex gap-2 items-center">
            <div>Qunatity:</div>

            <button
              onClick={decreaseQuantity}
              className="rounded-full w-5"
              disabled={cart[index].quantity === 1}
            >
              -
            </button>
            <input
              type="text"
              placeholder={cart[index].quantity}
              readOnly
              className="border-[1px] border-black w-10 text-center rounded-md placeholder:text-black "
            />
            <button onClick={increaseQuantity}>+</button>
          </div>
          <div>Amt: {formattedPrice}</div>
        </div>
      </CardBody>
    </Card>
  );
}
