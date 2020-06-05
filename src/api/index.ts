import { axiosInstance } from "api/axiosInstance";
import { User, UserSettings } from "models/User";
import { Pomodoro } from "models/Pomodoro";
import { Tag } from "models/Tag";

export const api = {
  register: async (email: string, password: string) =>
    (
      await axiosInstance.post<User>("/auth/register", {
        email,
        password,
      })
    ).data,
  login: async (email: string, password: string) =>
    (
      await axiosInstance.post<User>("/auth/login", {
        email,
        password,
      })
    ).data,
  logout: async () => await axiosInstance.post("/auth/logout"),
  confirmEmail: async (token: string) =>
    (
      await axiosInstance.post<User>("/auth/confirm-email", {
        token,
      })
    ).data,
  getUser: async () => (await axiosInstance.get<User>("/user")).data,
  setUserSettings: async (settings: UserSettings) =>
    (await axiosInstance.put<User>("/user/settings", settings)).data,
  createPomodoro: async (
    pomodoro: Omit<Pomodoro, "id" | "tags"> & { tags?: Array<string> }
  ) => (await axiosInstance.post<Pomodoro>("/pomodoros", pomodoro)).data,
  getPomodoros: async () =>
    (await axiosInstance.get<Pomodoro[]>("/pomodoros")).data,
  createTag: async (tag: Omit<Tag, "id">) =>
    (await axiosInstance.post<Tag>("/tags", tag)).data,
  getTags: async () => (await axiosInstance.get<Tag[]>("/tags")).data,
};
