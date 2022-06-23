import axios from "axios";

const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

const baseURL = isProduction 
  ? "https://www.api.platy.lapbermudez.com"
  : "http://localhost:5005/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});