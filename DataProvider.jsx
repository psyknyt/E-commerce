// DataProvider.js
import React, { useState, useEffect, useReducer } from "react";
import { DataContext } from "./DataContext";
import { redirect, useNavigate } from "react-router-dom";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

import axios from "./src/axios";

const defaultState = {
  user: {},
  data: [],
  products: [],
  categories: [],
  selectedCategories: [],
  wishlist: [],
  cart: [],
  selectedProductId: null,
  selectedProduct: undefined,
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
  if (action.type === "ADD_TO_CART") {
    return {
      ...state,
    };
  }
  if (action.type === "ADD_TO_WISHLIST") {
    if (state.wishlist.includes(action.payload)) {
      return state;
    }

    return {
      ...state,
      wishlist: [...state.wishlist, action.payload],
    };
  }
  if (action.type === "REMOVE_FROM_WISHLIST") {
    return {
      ...state,
      wishlist: state.wishlist.filter((id) => id !== action.payload),
    };
  }
  if (action.type === "addToCart") {
    // searching new product from the list of products..
    const newProduct = state.products.find(
      (product) => product.id === action.payload
    );

    if (state.cart.find((product) => product.id === newProduct.id)) {
      state.cart.find((product) => product.id === newProduct.id).quantity += 1;

      return {
        ...state,
      };
    } else {
      newProduct.quantity = 1;
    }

    return {
      ...state,
      cart: [...state.cart, newProduct],
    };
  }
  if (action.type === "setSelectedProduct") {
    const selectedProduct = state.products.find((product) => {
      return product.id === action.payload;
    });

    return {
      ...state,
      selectedProduct: selectedProduct,
    };
  }
  if (action.type === "userDetails") {
    return {
      ...state,
      user: action.payload,
    };
  }
};

// data Provider Component
const DataProvider = (props) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const [productState, dispatchAction] = useReducer(DataReducer, defaultState);

  useEffect(() => {
    try {
      async function getData() {
        const axiosData = await axios.get("/?limit=0");
        const axiosCategories = await axios.get("/categories");
        setData(axiosData.data);
        productState.data = axiosData.data;
        dispatchAction({ type: "setData", payload: productState.data });

        setProducts(axiosData.data.products);
        productState.product = axiosData.data.products;
        dispatchAction({
          type: "setProducts",
          payload: productState.product,
        });
        const categories = axiosCategories.data.map((item) =>
          item.name.toLowerCase()
        );

        productState.categories = categories;
        dispatchAction({
          type: "setCategories",
          payload: productState.categories,
        });
      }

      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await fetch(
          "https://node-auth-dk2l.onrender.com/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          userDetails(data.user);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (window !== undefined) {
      fetchUserDetails();
    }
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
  const addToWishlist = async (userId, productId) => {
    try {
      if (productState.user.wishlist.find((item) => item === productId)) {
        alert("item already exists in wishlist");
        dispatchAction({ type: "REMOVE_FROM_WISHLIST", payload: productId });
        return;
      }
      const response = await fetch(
        "https://node-auth-dk2l.onrender.com/wishlist/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatchAction({ type: "ADD_TO_WISHLIST", payload: productId });
        dispatchAction({ type: "userDetails", payload: data.user });
      } else {
        console.error("Failed to add to wishlist:", data.msg);
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const removeFromWishlist = async (userId, productId) => {
    try {
      const response = await fetch(
        "https://node-auth-dk2l.onrender.com/wishlist/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatchAction({ type: "REMOVE_FROM_WISHLIST", payload: productId });
        dispatchAction({ type: "userDetails", payload: data.user });
        // userDetails(data.user);
      } else {
        console.error("Failed to remove from wishlist:", data.msg);
      }
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const addToCart = (id) => {
    dispatchAction({ type: "addToCart", payload: id });
  };

  const setSelectedProduct = (id) => {
    dispatchAction({ type: "setSelectedProduct", payload: id });
  };
  const userDetails = (user) => {
    dispatchAction({ type: "userDetails", payload: user });
  };
  const handleWishlist = (ev, userId, productId) => {
    if (ev.target.checked) {
      addToWishlist(userId, productId);
    } else {
      removeFromWishlist(userId, productId);
    }
  };

  const res = {
    user: productState.user,
    data: data,
    products: products,
    categories: productState.categories,
    wishlist: productState.wishlist,
    cart: productState.cart,
    selectedCategories: productState.selectedCategories,
    selectedProductId: productState.selectedProjectId,
    selectedProduct: productState.selectedProduct,
    setSelectedProduct: setSelectedProduct,
    pageNumber: productState.pageNumber,
    pagination: pagination,
    nextPage: nextPage,
    prevPage: prevPage,
    setPage: pagination,
    drawerVisib: productState.drawerVisib,
    setDrawerVisib: setDrawerVisib,
    handleCategoryFilter: handleCategoryFilter,
    addToWishlist: addToWishlist,
    removeFromWishlist: removeFromWishlist,
    addToCart: addToCart,
    setUserDetails: userDetails,
    handleWishlist: handleWishlist,
  };

  return (
    <DataContext.Provider value={res}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
