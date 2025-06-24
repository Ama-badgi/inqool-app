import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, postUser } from "../api/userApi";

const USERS_QUERY_KEY = ["users"];

export const useFetchUsers = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
  });
};

export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
};
