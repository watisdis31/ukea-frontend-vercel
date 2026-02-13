import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const loginApi = axios.create({
  baseURL: BASE_URL,
});

export const addStaffApi = axios.create({
  baseURL: BASE_URL,
});

export const fetchProductsApi = axios.create({
  baseURL: BASE_URL,
});

export const fetchCategoryApi = axios.create({
  baseURL: BASE_URL,
});