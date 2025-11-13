import axios from "axios";
import { normalizeError } from "../errorNormalizer";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);
