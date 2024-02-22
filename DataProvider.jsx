// DataProvider.js
import React, { useState, useEffect, useReducer } from "react";
import { DataContext } from "./DataContext";

const defaultState = {
  data: [],
  products: [],
  categories: [],
  selectedProjectId: undefined,
  pageNumber: 1,
};

// data Reducer
const DataReducer = (state, action) => {
  console.log("state is: ", state);
  if (action.type === "pagination") {
    console.log("payload: ", action.payload);
    return {
      ...state,
      pageNumber: action.payload,
    };
  }
  if (action.type === "nextPage") {
    console.log("next Page: ", state.pageNumber);
    if (state.products) {
      console.log("true and page is: ", state.pageNumber);
    }
    return {
      ...state,
      pageNumber: state.pageNumber === 5 ? 5 : state.pageNumber + 1,
    };
  }
  if (action.type === "prevPage") {
    console.log("next Page: ", state.pageNumber);
    return {
      ...state,
      pageNumber: state.pageNumber === 1 ? 1 : state.pageNumber - 1,
    };
  }
};

// data Provider Component
const DataProvider = (props) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productState, dispatchAction] = useReducer(DataReducer, defaultState);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/?limit=100`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));

    fetch(`https://dummyjson.com/products/?limit=100`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching data:", error));

    console.log("data for : ", productState.pageNumber, data);

    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data) => (productState.categories = data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const pagination = (value) => {
    dispatchAction({ type: "pagination", payload: value });
  };
  const nextPage = () => {
    dispatchAction({ type: "nextPage", payload: "" });
  };
  const prevPage = () => {
    dispatchAction({ type: "prevPage", payload: "" });
  };

  console.log("product state: ", productState);

  const res = {
    data: data,
    products: products,
    categories: productState.categories,
    pageNumber: productState.pageNumber,
    pagination: pagination,
    nextPage: nextPage,
    prevPage: prevPage,
    setPage: pagination,
  };

  return (
    <DataContext.Provider value={res}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
