import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataContext";
import { Typography } from "@material-tailwind/react";
import { pipe } from "framer-motion";

export default function CartTotal() {
  const ctx = useContext(DataContext);
  const [amount, setAmount] = useState({});
  var total = 0,
    discount = 0,
    price = 0;

  for (const product of ctx.cart) {
    price += product.price;
    total += product.amount;
    discount += product.discount;
    //   console.log("product: ", product);
  }
  ctx.total = total;
  // console.log("price", price, total, discount);

  console.log("price", price, total, discount);

  price *= 84; // Convert $ to rupee

  const Price = price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const Total = total.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const Discount = discount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  //   console.log("price", Price, Total, Discount);

  return (
    <div className="flex flex-col gap-4 bg-white  w-[90%]  sm:max-w-[48rem] lg:w-[30%] h-[300px] px-6 rounded-lg lg:mr-5 mx-auto">
      <div className="uppercase text-gray-500 py-3">Price Details</div>
      <hr />
      <div className="flex flex-col gap-6 ">
        <div className="flex justify-between items-center font-medium">
          <Typography variant="small">
            Price of({ctx.cart.length} items)
          </Typography>
          <Typography variant="small">{Price}</Typography>
        </div>
        <div className="flex justify-between items-center font-medium border-t-2 border-dashed pt-5">
          <Typography variant="small">Discount</Typography>
          <Typography color="green" variant="small">
            {Discount}
          </Typography>
        </div>
        <div className="flex justify-between items-center font-bold border-y-2 border-dashed py-5">
          <Typography variant="small" color="green">
            Total Price:
          </Typography>
          <Typography color="green" variant="small">
            {Total}
          </Typography>
        </div>
      </div>
    </div>
  );
}
