// import React from "react";
// import ReactDOM from "react-dom/client";
// import DataProvider from "../DataProvider.jsx";
// import App from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <DataProvider>
//       <App />
//     </DataProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import DataProvider from "../DataProvider.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { createRoot } from "react-dom/client";

import Cart from "./Components/Cart.jsx";
import Categories from "./Components/Categories.jsx";
import ProductList from "./Components/ProductList.jsx";
import Header from "./Components/Header.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Header />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <ProductList />,
//       },
//       {
//         path: "categories",
//         element: <Categories />,
//       },
//       {
//         path: "cart",
//         element: <Cart />,
//       },
//     ],
//   },
// ]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route path="/" element={<Header />} />
//       {/* <Route index element={<ProductList />} /> */}
//       <Route exact path="categories" element={<Categories />} />
//       <Route exact path="cart" element={<Cart />} />
//     </Routes>
//   )
// );

const router = createBrowserRouter([
  { path: "*", Component: App, errorElement: <ErrorPage /> },
]);

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <DataProvider>
    <RouterProvider router={router} />
    {/* <App /> */}
  </DataProvider>
  // </React.StrictMode>
);
