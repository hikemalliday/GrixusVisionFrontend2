import { useState, useEffect } from "react";

// Currently only called in AuthContext, could possibly just move this logic into there entirely
export const useLocalStorage = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") ?? ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") ?? ""
  );

  // Do we need both of these?
  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [accessToken, refreshToken]);

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, []);

  return {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  };
};
