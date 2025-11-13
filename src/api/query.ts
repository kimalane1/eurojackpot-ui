import type { Draw } from "../common/Draw";
import { api } from "./api";

export async function getDraws(): Promise<Draw[]>{
  const response = await api.get("/draws");
  return response.data;
}