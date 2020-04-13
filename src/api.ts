import { axiosInstance } from "axiosInstance";
import { User } from "models/User";

export const api = {
  register: async (email: string, password: string) =>
    (
      await axiosInstance.post<User>("/auth/register", {
        email,
        password
      })
    ).data,
  login: async (email: string, password: string) =>
    (
      await axiosInstance.post<User>("/auth/login", {
        email,
        password
      })
    ).data
};
