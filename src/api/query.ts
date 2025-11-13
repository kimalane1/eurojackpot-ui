import { api } from "./api";

export async function getDraws() {
  const response = await api.get("/draws");
  return response.data;
}