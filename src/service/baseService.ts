import { AxiosResponse } from "axios";

export const API_URL = "https://eshop-api-lime.vercel.app/";

export const handleRequest = async<T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try{
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}