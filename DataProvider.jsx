// DataProvider.js
import React, { useState, useEffect, useReducer } from "react";
import { DataContext } from "./DataContext";
import { redirect } from "react-router-dom";

const defaultState = {
  data: [],
  products: [],
  categories: [],
  selectedCategories: [],
  wishlist: [],
  cart: [],
  selectedProjectId: undefined,
  pageNumber: 1,
  drawerVisib: false,
};

// data Reducer
const DataReducer = (state, action) => {
  if (action.type === "pagination") {
    return {
      ...state,
      pageNumber: action.payload,
    };
  }
  if (action.type === "nextPage") {
    return {
      ...state,
      pageNumber: state.pageNumber + 1,
    };
  }
  if (action.type === "prevPage") {
    return {
      ...state,
      pageNumber: state.pageNumber - 1,
    };
  }
  if (action.type === "setProducts") {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === "setCategories") {
    return {
      ...state,
      categories: action.payload,
    };
  }
  if (action.type === "setData") {
    return {
      ...state,
      data: action.payload,
    };
  }
  if (action.type === "setDrawerVisibility") {
    return {
      ...state,
      drawerVisib: action.payload,
    };
  }
  if (action.type === "categoryFilter") {
    const updatedCategoriesSet = new Set(state.selectedCategories);

    // Add the new category to the Set
    if (action.payload.ev.target.checked) {
      updatedCategoriesSet.add(action.payload.category);
    } else {
      updatedCategoriesSet.delete(action.payload.category);
    }
    // Convert Set back to an array
    const updatedSelectedCategories = Array.from(updatedCategoriesSet);

    return {
      ...state,
      selectedCategories: updatedSelectedCategories,
    };
  }
  if (action.type === "handle-wishlist") {
    const updatedWishlistSet = new Set(state.wishlist);

    if (action.payload.ev.target.checked) {
      updatedWishlistSet.add(
        state.products.find((el) => el.id === action.payload.id)
      );
    } else {
      updatedWishlistSet.delete(
        state.products.find((el) => el.id === action.payload.id)
      );
    }

    const updatedWishlistArray = Array.from(updatedWishlistSet);

    return {
      ...state,
      wishlist: updatedWishlistArray,
    };
  }
  if (action.type === "addToCart") {
    // searching new product from the list of products..
    const newProduct = state.products.find(
      (product) => product.id === action.payload
    );

    if (state.cart.find((product) => product.id === newProduct.id)) {
      state.cart.find((product) => product.id === newProduct.id).quantity += 1;
      console.log("same");
      return {
        ...state,
      };
    } else {
      newProduct.quantity = 1;
      console.log("not same");
    }

    return {
      ...state,
      cart: [...state.cart, newProduct],
    };
  }
};

// data Provider Component
const DataProvider = (props) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const [productState, dispatchAction] = useReducer(DataReducer, defaultState);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/?limit=100`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        dispatchAction({ type: "setData", payload: data });
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch(`https://dummyjson.com/products/?limit=100`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        dispatchAction({ type: "setProducts", payload: data.products });
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        productState.categories = data;
        dispatchAction({
          type: "setCategories",
          payload: productState.categories,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const pagination = (value) => {
    dispatchAction({ type: "pagination", payload: value });
  };
  const nextPage = () => {
    dispatchAction({ type: "nextPage" });
  };
  const prevPage = () => {
    dispatchAction({ type: "prevPage" });
  };
  const setDrawerVisib = (value) => {
    dispatchAction({ type: "setDrawerVisibility", payload: value });
  };
  const handleCategoryFilter = (ev, category) => {
    dispatchAction({ type: "categoryFilter", payload: { ev, category } });
  };
  const handleWishlist = (ev, id) => {
    dispatchAction({ type: "handle-wishlist", payload: { ev, id } });
  };
  const addToCart = (id) => {
    dispatchAction({ type: "addToCart", payload: id });
  };

  const res = {
    data: data,
    products: products,
    categories: productState.categories,
    wishlist: productState.wishlist,
    cart: productState.cart,
    selectedCategories: productState.selectedCategories,
    pageNumber: productState.pageNumber,
    pagination: pagination,
    nextPage: nextPage,
    prevPage: prevPage,
    setPage: pagination,
    drawerVisib: productState.drawerVisib,
    setDrawerVisib: setDrawerVisib,
    handleCategoryFilter: handleCategoryFilter,
    handleWishlist: handleWishlist,
    addToCart: addToCart,
  };

  return (
    <DataContext.Provider value={res}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
