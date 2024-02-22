// DataContext.js
import React from "react";

export const DataContext = React.createContext({
  data: [],
  products: [],
  categories: [],
  selectedProduct: null,
  pageNumber: 1,
  nextPage: () => {},
  prevPage: () => {},
  setPage: (value) => {},
  categoryVisib: false,
  setCategories: (value) => {},
});
