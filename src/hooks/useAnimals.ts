import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Animal } from "../types/animal";
import type { AnimalFormData } from "../schemas/animalSchema";
import axios from "axios";

const animalsUrl = "https://inqool-interview-api.vercel.app/api/animals";
const ANIMALS_QUERY_KEY = ["animals"];

const fetchAnimals = async (): Promise<Animal[]> => {
  const response = await axios.get(animalsUrl);
  return response.data;
};

export const useFetchAnimals = () => {
  return useQuery({
    queryKey: ANIMALS_QUERY_KEY,
    queryFn: fetchAnimals,
  });
};

const postAnimal = async (formData: AnimalFormData) => {
  const response = await axios.post(animalsUrl, formData);
  return response.data;
};

export const usePostAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAnimal,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ANIMALS_QUERY_KEY }),
  });
};
