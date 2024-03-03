import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductList from "./ProductList";
import DrawerCategories from "./Drawer";
import Navbar from "./Navbar";
import Categories from "./Categories";

import { DataContext } from "../../DataContext";

export default function Header({ products }) {
  const ctx = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if selectedCategories is empty and navigate to the root route "/"
    if (ctx.selectedCategories?.length === 0) {
      navigate("/");
    }
  }, [ctx.selectedCategories, navigate]);

  return (
    <>
      <div
        className={`w-full sm:h-[80vh]
        }  bg-cover bg-center bg-no-repeat flex content-center justify-center bg-gradient-to-b from-blue-500 to-blue-300`}
      >
        {ctx.selectedCategories.length === 0 && (
          <div className="flex flex-col justify-center items-center text-white relative z-10">
            <div className="mx-auto font-abel text-[32px] md:text-[46px] sm:text-[48px] lg:[72px] w-[70%] text-center">
              Header Shop whatever you want to, and You can pay later...🥳
            </div>
            <div className="text-[12px] mx-auto w-[50%] text-center my-3">
              We are still under build...
            </div>
            <div className="mx-auto flex justify-around">
              <a
                href="https://twitter.com/psyknyt"
                target="blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white text-black m-2 py-[12px] px-[30px] rounded-full font-roboto text-[16px]">
                  Contact Us
                </button>
              </a>
              <a
                href="https://github.com/psyknyt"
                target="blank"
                rel="noopener noreferrer"
              >
                <button className="text-white border-white border-2 m-2 py-[12px] px-[30px] rounded-full font-roboto text-[16px]">
                  Learn more
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
      {ctx.selectedCategories.length === 0 && <ProductList />}
    </>
  );
}
