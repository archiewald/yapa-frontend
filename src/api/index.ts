import { axiosInstance } from "api/axiosInstance";
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
    ).data,
  confirmEmail: async (token: string) =>
    (
      await axiosInstance.post<User>("/auth/confirm-email", {
        token
      })
    ).data,
  getUser: async () => (await axiosInstance.get<User>("/auth/get-user")).data
};
