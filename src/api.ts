import axios from "axios";

// TODO: make env works
// axios.create({ baseURL: "http://localhost:5000" });

export const api = {
  register: async (email: string, password: string) =>
    // TODO: add response typings
    (
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email,
        password,
      })
    ).data,
};
