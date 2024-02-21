// DataProvider.js
import React, { useState, useEffect } from "react";
import { DataContext } from "./DataContext";

const DataProvider = (props) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // for products
    fetch("https://dummyjson.com/products/?limit=100&delay=2")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));

    // console.log(data);
  }, []);
  useEffect(() => {
    // for categories
    fetch("https://dummyjson.com/products/?limit=30&delay=2")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));

    // console.log(data);
  }, []);

  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
