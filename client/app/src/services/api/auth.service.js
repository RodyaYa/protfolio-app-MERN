import { default as axios } from "axios";

import { API_URL } from "../../config/config";

export const authService = {
  login: async (authData) => {
    try {
      return await axios.post(`${API_URL}/auth/login`, authData, {});
    } catch (error) {
      console.log(error);
    }
  },
  register: async (authData) => {
    try {
      return await axios.post(`${API_URL}/auth/register`, authData, {});
    } catch (error) {
      console.log(error);
    }
  },
  logout: async (userId) => {
    try {
      console.log(userId);
      return await axios.post(`${API_URL}/auth/logout`, { userId }, {});
    } catch (error) {
      console.log(error);
    }
  },
};
