import React, { useContext } from "react";
import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

import logo from "../assets/logo.png";
import { open } from "../assets/svg";

import DrawerCategories from "./Drawer";
import "../App.css";
import { DataContext } from "../../DataContext";

export default function Navbar() {
  // handling scroll for the navigation
  const ctx = useContext(DataContext);
  window.addEventListener("scroll", function () {
    var navbar = document.getElementById("navbar");
    var btnSearch = document.getElementById("btn-search");

    // console.log(window.scrollY, y);

    if (window.scrollY > 0) {
      navbar.classList.remove("bg-white");
      navbar.classList.add("blur-nav");
      btnSearch.classList.add("hidden");
    } else {
      navbar.classList.remove("blur-nav");
      navbar.classList.add("bg-white");
      btnSearch.classList.remove("hidden");
    }
  });
  const openDrawer = () => {
    console.log("categories set");
    ctx.setCategories(true);
  };
  return (
    <>
      <nav
        id="navbar"
        className="z-50 fixed flex justify-between w-[90%] h-[60px] mx-auto  my-2 px-0 py-4 top-0 items-center md:justify-start  text-black font-openSans text-[12px] sm:text-[16px] md:text-[14px] rounded-full  bg-white hover:text-black "
      >
        <img
          src={logo}
          alt="logo"
          className="rounded-full motion-safe:duration-7000 object-contain w-[55px] h-[45px] mx-2"
        />
        {/* search Bar */}
        <div className="hidden md:flex flex-col gap-x-2 sm:flex-row sm:items-center">
          <div className="relative w-full gap-2 md:w-[50%] mx-auto z-0">
            <Input
              type="search"
              placeholder="Search"
              className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="white"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <Button
            size="md"
            id="btn-search"
            className="z-1 mt-1 rounded-lg sm:mt-0 bg-black "
          >
            Search
          </Button>
        </div>
        {/* Nav items */}
        <div className="ml-auto hidden lg:flex justify-around items-center">
          <span className="ml-3 sm:ml-6">Home</span>
          <button className="ml-3 sm:ml-6 mr-5" onClick={openDrawer}>
            categories
          </button>

          <div className="ml-auto sm:mr-5">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="flex items-center gap-x-2 p-1 font-medium"
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                  fill="#90A4AE"
                />
              </svg>
              <a href="#" className="flex items-center">
                Account
              </a>
            </Typography>
          </div>
        </div>
        {/* open Close button for small devices to see the navbar */}
        <div className="lg:hidden ml-auto">
          <img
            src={open}
            alt="menu"
            className="w-[30px] object-contain cursor-pointer mx-4"
          />
        </div>
      </nav>
    </>
  );
}
