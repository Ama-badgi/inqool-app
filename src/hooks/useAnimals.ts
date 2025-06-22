import { useQuery } from "@tanstack/react-query";
import type { Animal } from "../types/animal";
import axios from "axios";

const animalsUrl = "https://inqool-interview-api.vercel.app/api/animals";

const fetchAnimals = async (): Promise<Animal[]> => {
  const response = await axios.get(animalsUrl);
  return response.data;
};

export const useFetchAnimals = () => {
  return useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });
};
