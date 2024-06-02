import React from "react";
import CartProduct from "./CartProduct";
import { useContext } from "react";

import { DataContext, useContext } from "../../DataContext";

function Wishlist() {
  const ctx = useContext(DataContext);
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full h-[30vh] text-4xl flex justify-center items-center  bg-gray-200">
        {ctx.wishlist.length > 0 && (
          <p className="text-4xl text-center">
            Showing wishlist for user: ...{ctx.user.name}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-start bg-gray-200 gap-4 w-full py-5">
        <div className="sm:ml-10 w-[90%] lg:w-full mx-auto">
          {ctx.cart.map((el, index) => (
            <CartProduct props={el} key={index} index={index} />
          ))}
          {ctx.cart.length === 0 && (
            <p className="text-4xl text-center">No Product in Cart...</p>
          )}
        </div>
        <CartTotal />
      </div>
    </div>
  );
}

export default Wishlist;
