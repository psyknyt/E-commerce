import React, { useContext, useEffect } from "react";
import { DataContext } from "../../DataContext";
import { Link } from "react-router-dom";
import AuthContext from "../../AuthContext";
import { useNavigate } from "react-router-dom";

import { CiPower } from "react-icons/ci";

function UserProfile() {
  const ctx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const { user } = ctx;
  const { id, username, name, cart, wishlist } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx.token === null) {
      alert("sigin first");
      navigate("/signin");
    }
  }, []);
  return (
    <div className="h-screen bg-gray-200 pt-5 ">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold">User Profile</div>
        <div className="text-sm font-bold">
          {authCtx.token === null ? "Welcome user" : `Welcome ${ctx.user.name}`}
        </div>
      </div>

      {authCtx.token && (
        <div className="mt-[10rem] flex flex-col justify-center items-center">
          <div className="w-full sm:w-[75%] md:w-[50%] mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-gray-700 mb-2 flex w-[50%] text-left mx-auto place-content-start">
              <span className="font-bold">Id:&nbsp;</span>
              <span className="font-light">{id}</span>
            </div>
            <div className="text-gray-700 mb-2 flex w-[50%] text-left mx-auto place-content-start">
              <span className="font-bold">Email:&nbsp;</span>
              <span className="font-light">{username}</span>
            </div>
            <div className="text-gray-700 mb-6 flex w-[50%] text-left mx-auto place-content-start">
              <span className="font-bold">Name:&nbsp;</span>
              <span className="font-light">{name}</span>
            </div>

            <div className="text-gray-700 mb-2 flex w-[50%] text-left mx-auto place-content-start">
              <p className="font-bold">Cart:&nbsp;</p>
              {ctx.cart?.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                <p>
                  <Link to="/cart">
                    <p>view cart</p>
                  </Link>
                </p>
              )}
            </div>

            <div className="text-gray-700 mb-2 flex w-[50%] text-left mx-auto place-content-start">
              <p className="font-bold">Wishlist:&nbsp;</p>
              {wishlist.length === 0 ? (
                <p className="text-gray-500">Wishlist is empty</p>
              ) : (
                <Link to="/cart">
                  <p className="">view wishlist</p>
                </Link>
              )}
            </div>

            <div
              className="mt-4 text-gray-700 mb-2 flex w-[50%] text-left mx-auto place-content-start items-center gap-1"
              onClick={() => authCtx.logout()}
            >
              <CiPower className="w-4 h-4" />
              <p>Log out</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
