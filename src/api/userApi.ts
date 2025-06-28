import type { UserFormData } from "../schemas/userSchema";
import type { User } from "../types/user";
import axiosInstance from "./axiosInstance";

const USERS_URL = "/users";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get(USERS_URL);
  return response.data;
};

export const postUser = async (formData: UserFormData) => {
  const response = await axiosInstance.post(USERS_URL, {
    ...formData,
    banned: false,
  });
  return response.data;
};

export const patchUserDetails = (
  id: string,
  updatedData: Partial<UserFormData>
) => {
  return axiosInstance.patch(`${USERS_URL}/${id}`, updatedData);
};

export const patchUserBan = (id: string, banned: boolean) => {
  return axiosInstance.patch(`${USERS_URL}/${id}`, { banned });
};
