import { useState, useCallback, useEffect } from "react";

import { authService } from "../services/api/auth.service";

import { USER_DATA_LOCALSTORAGE_NAME } from "../config/config.js";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback(async (jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      USER_DATA_LOCALSTORAGE_NAME,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback((id) => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(USER_DATA_LOCALSTORAGE_NAME);
    authService.logout(id);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USER_DATA_LOCALSTORAGE_NAME));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
