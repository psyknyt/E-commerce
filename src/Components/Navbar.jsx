import { useContext, useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DrawerCategories from "./Drawer";
import "../App.css";
import { DataContext } from "../../DataContext";
import AuthContext from "../../AuthContext";
import logo from "../assets/logo.png";

import { CiPower } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { AiOutlineJava } from "react-icons/ai";

const navbarProps = {
  Logo: { type: "img", text: "LOGO GOES HERE !", img: "../assets/logo.png" },
  Home: { type: "Link", link: "Home" },
  Cart: { type: "Link", link: "Cart" },
  Signup: { type: "Link", link: "signup" },
  Signin: { type: "Link", link: "signin" },
  Categories: { type: "drawer", link: "Categories" },
  Account: {
    type: "dropdown",
    dropdown: {
      "item-1": { type: "link", link: "#item-1" },
      "item-2": { type: "link", link: "#item-2" },
      "item-3": { type: "link", link: "#item-3" },
      "item-4": { type: "link", link: "#item-4" },
      "item-5": { type: "link", link: "#item-5" },
    },
  },
};

const Logo = () => {
  return (
    <a
      href="/"
      className="logo wrapper min-w-16 max-w-48 flex items-center justify-center px-2"
    >
      {navbarProps.Logo.type === "text" ? (
        <span className="font-bold">{navbarProps.Logo.text}</span>
      ) : (
        <img
          src={logo}
          alt={navbarProps.Logo.text}
          className="rounded-full motion-safe:duration-7000 object-contain w-[55px] h-[45px] mx-2"
        />
      )}
    </a>
  );
};

const MenuToggleButton = ({ show, setShow }) => {
  return (
    <div
      className="menu_toggle_btn wrapper flex md:hidden items-center justify-center w-16 h-full  ml-auto"
      onClick={() => setShow(!show)}
    >
      <div className="relative  w-full h-full flex flex-col gap-y-4 justify-center items-center">
        <div
          className={`bg-black w-8 h-1 rounded-md ${
            show ? "opacity-0 duration-300" : "opacity-100 duration-1000"
          }`}
        ></div>
        <div
          className={`bg-black w-8 h-1 rounded-md ${
            show ? "opacity-0 duration-300" : "opacity-100 duration-1000"
          }`}
        ></div>
        <div
          className={`bg-black w-8 h-1 rounded-md transform absolute top-[47%] left-[25%] transition-transform duration-500 ${
            show ? "rotate-45 " : "rotate-0"
          }`}
        ></div>
        <div
          className={`bg-black w-8 h-1 rounded-md transform absolute top-[47%] left-[25%] transition-transform duration-500 ${
            show ? "-rotate-45" : "rotate-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default function Nav() {
  const ctx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const [show, setShow] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDropDownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (authCtx.token === "null") {
      e.preventDefault(); // Prevent the default link behavior
      alert("Please log in first");
    }
  };
  const toggleDropown = () => {
    setIsDropdownVisible(!isDropDownVisible);
  };
  const handleDropdown = () => {
    setIsVisible(!isVisible);
  };
  const openDrawer = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    ctx.setDrawerVisib(true);
  };

  useEffect(() => {
    if (authCtx.token === "null") {
      navigate("/signin");
    }
  }, [authCtx.token, navigate]);
  return (
    <div
      className="nav-wrapper w-full h-16 bg-white flex justify-between items-center"
      onClick={() => setIsDropdownVisible(false)}
    >
      <div className="nav-logo flex justify-center items-center px-2 font-bold text-xl ">
        <Logo />
      </div>
      {/* for small devices */}
      <div
        className={`menu-wrapper  z-50 w-full overflow-y-hidden absolute md:hidden top-16 md:top-auto left-0 ${
          show ? "bottom-0" : "h-0"
        } md:h-full md:bottom-auto `}
      >
        <ul
          className={`pt-[10rem]  ml-auto menu flex flex-col md:flex-row w-full overflow-y-hidden bg-white transition-all duration-500 md:transform-none md:delay-0 md:duration-0 ${
            show ? "h-full pt-4 px-2" : "h-0"
          } md:h-full md:space-x-4  space-y-4 md:space-y-0 md:pt-0 md:pl-auto`}
        >
          <Link to="/">
            <li className="navdrop md:h-full bg-blue-500 text-white  text-xl">
              <div
                className="navdrop-navlink h-16 w-full flex justify-center items-center"
                // Closing the toggle button added this onClick event to every navlink on small devices
                onClick={() => setShow(!show)}
              >
                Home
              </div>
              {/* No dropdown for Home navlink */}
            </li>
          </Link>
          <Link to="/cart">
            <li
              className="navlink h-16 md:h-full bg-blue-500 text-white  text-xl justify-center items-center flex"
              onClick={() => setShow(!show)}
            >
              Cart
            </li>
          </Link>
          <Link to="/categories">
            <li
              className="navlink h-16 md:h-full bg-blue-500 text-white  text-xl justify-center items-center flex"
              onClick={() => {
                openDrawer();
                setShow(!show);
              }}
            >
              Categories
            </li>
          </Link>
          <Link to="/userprofile">
            <li
              className="navlink h-16 md:h-full bg-blue-500 text-white  text-xl justify-center items-center flex gap-2"
              onClick={() => setShow(!show)}
            >
              <svg
                width="20"
                height="22"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                  fill="#fff"
                />
              </svg>
              <a href="#" className="flex items-center">
                Account
              </a>
            </li>
          </Link>
          {!authCtx.token && (
            <Link to="/signup">
              <li
                className="navlink h-16 md:h-full bg-blue-500 text-white  text-xl justify-center items-center flex"
                onClick={() => setShow(!show)}
              >
                Sign up
              </li>
            </Link>
          )}
          {!authCtx.token && (
            <Link to="/signin">
              <li
                className="navlink h-16 md:h-full bg-blue-500 text-white  text-xl justify-center items-center flex"
                onClick={() => setShow(!show)}
              >
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
      {/* for bigger screen */}
      <div
        className="menu-wrapper-md ml-auto hidden md:flex px-4  h-full text-sm"
        onMouseEnter={() => setIsDropdownVisible(false)}
      >
        <ul className="type-none flex  md:space-x-10 h-full">
          <Link to="/">
            <div className="navlink relative h-full">
              <div className="flex group items-center gap-1  h-full ">
                <p className="">Home</p>
                <div className="absolute inset-x-0 bottom-[15px] border-b-2 border-transparent transition-colors duration-300 group-hover:border-black"></div>
                {/* {isDropDownVisible && (
                  <div
                    className="absolute top-full left-0 bg-white  shadow-md rounded  w-[200%]"
                    onMouseLeave={() => setIsDropdownVisible(false)}
                  >
                    <ul>
                      <li className="p-2 hover:bg-gray-100">Dropdown Item 1</li>
                      <li className="p-2 hover:bg-gray-100">Dropdown Item 2</li>
                      <li className="p-2 hover:bg-gray-100">Dropdown Item 3</li>
                    </ul>
                  </div>
                )} */}
              </div>
            </div>
          </Link>
          {/* TODO changed the route to / on account */}

          <Link to={"/userprofile"} onClick={handleClick}>
            <div className="navlink relative h-full">
              <div
                className="relative flex group items-center gap-1  h-full "
                onMouseEnter={() => setIsDropdownVisible(!isDropDownVisible)}
              >
                <p className="flex gap-2">
                  <CgProfile className="w-4 h-4 text-blue-[#FC4100]" />
                  Account
                </p>
                <div className="absolute inset-x-0 bottom-[15px] border-b-2 border-transparent transition-colors duration-300 group-hover:border-black"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3  group-hover:rotate-180 transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>

                {isDropDownVisible && (
                  <div className="absolute top-full left-0 bg-white  shadow-md rounded  w-[200%] py-3">
                    <ul className=" justify-start flex flex-col">
                      <Link to="/userprofile">
                        <li className="p-2 hover:bg-gray-100 flex gap-2 items-center">
                          <CgProfile className="w-4 h-4 text-blue-[#FC4100]" />
                          Profile
                        </li>
                      </Link>
                      <li
                        className="p-2 hover:bg-gray-100 flex gap-2 items-center"
                        onClick={() => authCtx.logout()}
                      >
                        <CiPower className="w-4 h-4" />
                        Log out
                      </li>
                      {/* <li className="p-2 hover:bg-gray-100">Dropdown Item 3</li> */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Link>

          <Link to="/categories">
            <div
              className="group flex items-center navlink group relative h-full"
              onClick={openDrawer}
            >
              <div className="absolute inset-x-0 bottom-[15px] border-b-2 border-transparent transition-colors duration-3000 group-hover:border-black"></div>
              <p>Categories</p>
            </div>
          </Link>
          <Link to="/cart">
            <div className="flex items-center group navlink group relative h-full">
              <div className="absolute inset-x-0 bottom-[15px] border-b-2 border-transparent transition-colors duration-3000 group-hover:border-black"></div>
              <div className="flex justify-center items-center group gap-1">
                <p>Cart</p>
              </div>
            </div>
          </Link>
          {!authCtx.token && (
            <Link to="/signup">
              <div className="group flex items-center navlink group relative h-full">
                <div className="absolute inset-x-0 bottom-[15px] border-b-2 border-transparent transition-colors duration-3000 group-hover:border-black"></div>
                <p>Signup</p>
              </div>
            </Link>
          )}
          {!authCtx.token && (
            <Link to="/signin">
              <div className="group flex items-center navlink group relative h-full">
                <div className="absolute inset-x-0 bottom-[15px] border-b-2 border-transparent transition-colors duration-3000 group-hover:border-black"></div>
                <p>Signin</p>
              </div>
            </Link>
          )}
        </ul>
      </div>
      <MenuToggleButton show={show} setShow={setShow} />
      <DrawerCategories text="categories" id="categoryDrawer" />
    </div>
  );
}

// import React, { useContext } from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Input, Typography } from "@material-tailwind/react";

// import logo from "../assets/logo.png";
// import { open, close } from "../assets/svg";

// import DrawerCategories from "./Drawer";
// import "../App.css";
// import { DataContext } from "../../DataContext";

// export default function Navbar() {
//   // handling scroll for the navigation
//   const ctx = useContext(DataContext);

//   // navbar state for small device
//   const [toggle, setToggle] = useState(false);
//   const handleToggle = () => {
//     setToggle(!toggle);
//     console.log("open for small device: ", toggle);
//   };
//   window.addEventListener("scroll", function () {
//     var navbar = document.getElementById("navbar");

//     // console.log(window.scrollY, y);

//     if (window.scrollY > 0) {
//       navbar.classList.remove("bg-white");
//       navbar.classList.add("blur-nav");
//     } else {
//       navbar.classList.remove("blur-nav");
//       navbar.classList.add("bg-white");
//     }
//   });

// const openDrawer = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
//   console.log("check drawer: ", ctx);
//   ctx.setDrawerVisib(true);
// };

//   return (
//     <>
//       <nav
//         id="navbar"
//         className="z-50 fixed flex justify-between w-full h-[60px] mx-auto  px-0 py-10 top-0 items-center md:justify-start  text-black font-openSans text-[12px] sm:text-[16px] md:text-[14px]   bg-white hover:text-black "
//       >
//         <img
//           src={logo}
//           alt="logo"
//           className="rounded-full motion-safe:duration-7000 object-contain w-[55px] h-[45px] mx-2"
//         />
//         {/* search Bar */}
//         <div className="hidden md:flex flex-col gap-x-2 sm:flex-row sm:items-center">
//           <div className="relative w-full gap-2 md:w-[50%] mx-auto z-0">
//             <Input
//               type="search"
//               placeholder="Search"
//               className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />
//             <div className="!absolute left-3 top-[13px]">
//               <svg
//                 width="13"
//                 height="14"
//                 viewBox="0 0 14 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
//                   fill="white"
//                 />
//                 <path
//                   d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
//                   stroke="black"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>
//           <Button size="md" className="z-1 mt-1 rounded-lg sm:mt-0 bg-black">
//             Search
//           </Button>
//         </div>
//         {/* Nav items */}
//         <div className="ml-auto hidden lg:flex justify-around items-center">
//           <Link to="/">
//             <span className="ml-3 sm:ml-6">Home</span>
//           </Link>
//           <Link to="/cart">
//             <span className="ml-3 sm:ml-6">Cart</span>
//           </Link>
//           <Link to="/categories">
//             <button className="ml-3 sm:ml-6 mr-5" onClick={openDrawer}>
//               categories
//             </button>
//           </Link>

//           <div className="ml-auto sm:mr-5">
//             <Typography
//               as="li"
//               variant="small"
//               color="blue-gray"
//               className="flex items-center gap-x-2 p-1 font-medium"
//             >
//               <svg
//                 width="16"
//                 height="17"
//                 viewBox="0 0 16 17"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   clip-rule="evenodd"
//                   d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
//                   fill="#90A4AE"
//                 />
//               </svg>
//               <a href="#" className="flex items-center">
//                 Account
//               </a>
//             </Typography>
//           </div>
//         </div>
//         {/* open Close button for small devices to see the navbar */}
//         <div className="lg:hidden ml-auto">
//           <img
//             src={!toggle ? open : close}
//             onClick={handleToggle}
//             alt="menu"
//             className="w-[30px] object-contain cursor-pointer mx-4"
//           />
//         </div>
//       </nav>
//       <DrawerCategories text="categories" id="categoryDrawer" />
//     </>
//   );
// }
