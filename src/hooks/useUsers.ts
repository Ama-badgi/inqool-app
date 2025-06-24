import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user";
import type { UserFormData } from "../schemas/userSchema";
import axios from "axios";

const usersUrl = "https://inqool-interview-api.vercel.app/api/users";
const USERS_QUERY_KEY = ["users"];

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(usersUrl);
  return response.data;
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
  });
};

const postUser = async (formData: UserFormData) => {
  const response = await axios.post(usersUrl, { ...formData, banned: false });
  return response.data;
};

export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
};
