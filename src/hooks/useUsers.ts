import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usersUrl = "https://inqool-interview-api.vercel.app/api/users";

interface User {
  id: number;
  name: string;
  gender: string;
  banned: boolean;
}

const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get(usersUrl);
    return response.data;

}

export const useFetchUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    })
}
