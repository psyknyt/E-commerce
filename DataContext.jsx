// DataContext.js
import React from "react";

export const DataContext = React.createContext({
  data: [],
  products: [],
  categories: [],
  selectedCategories: [],
  wishlist: [],
  selectedProduct: null,
  pageNumber: 1,
  nextPage: () => {},
  prevPage: () => {},
  setPage: (value) => {},
  drawerVisib: false,
  setDrawerVisib: (value) => {},
  handleCategoryFilter: (event, category) => {},
  setWishlist: (ev, id) => {},
});
