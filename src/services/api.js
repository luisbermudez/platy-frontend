import axios from "axios";

const baseURL =
  "https://platybend.herokuapp.com/api";
  // "http://localhost:5005/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});
