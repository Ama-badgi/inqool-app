import axiosInstance from "./axiosInstance";
import type { Animal } from "../types/animal";
import type { AnimalFormData } from "../schemas/animalSchema";

const ANIMALS_URL = "/animals";

export const fetchAnimals = async (): Promise<Animal[]> => {
  const response = await axiosInstance.get(ANIMALS_URL);
  return response.data;
};

export const postAnimal = async (formData: AnimalFormData) => {
  const response = await axiosInstance.post(ANIMALS_URL, formData);
  return response.data;
};
