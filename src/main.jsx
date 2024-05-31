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
import { AuthContextProvider } from "../AuthContext.jsx";
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

const router = createBrowserRouter([
  { path: "*", Component: App, errorElement: <ErrorPage /> },
]);

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
