import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export default API;
