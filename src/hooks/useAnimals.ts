import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAnimals, postAnimal } from "../api/animalApi";

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
