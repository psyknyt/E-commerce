// DataContext.js
import React from "react";

export const DataContext = React.createContext({
  data: [],
  products: [],
  categories: [],
  selectedCategories: [0],
  wishlist: [],
  cart: [],
  selectedProduct: null,
  pageNumber: 1,
  nextPage: () => {},
  prevPage: () => {},
  setPage: (value) => {},
  drawerVisib: false,
  setDrawerVisib: (value) => {},
  handleCategoryFilter: (event, category) => {},
  handleWishlist: (ev, id) => {},
  addToCart: (id) => {},
});
