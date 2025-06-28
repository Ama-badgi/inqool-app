import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAnimals, patchAnimal, postAnimal } from "../api/animalApi";
import type { AnimalFormData } from "../schemas/animalSchema";

const ANIMALS_QUERY_KEY = ["animals"];

export const useFetchAnimals = () => {
  return useQuery({
    queryKey: ANIMALS_QUERY_KEY,
    queryFn: fetchAnimals,
  });
};

export const usePostAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAnimal,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ANIMALS_QUERY_KEY }),
  });
};

export const usePatchAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AnimalFormData> }) =>
      patchAnimal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANIMALS_QUERY_KEY });
    },
  });
};
