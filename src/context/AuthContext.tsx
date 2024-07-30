import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface IAuthProviderValues {
  authUser: object | null;
  setAuthUser: React.Dispatch<React.SetStateAction<{} | null>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  login: (tokens: ITokens) => void;
  clear: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ITokens {
  access_token: string;
  refresh_token: string;
}

const AuthContext = createContext<IAuthProviderValues | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<{} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
    useLocalStorage();

  const login = (tokens: ITokens) => {
    const accessToken = tokens["access_token"];
    const refreshToken = tokens["refresh_token"];
    setAccessToken(accessToken ?? "");
    setRefreshToken(refreshToken ?? "");
    setAuthUser({ accessToken, refreshToken });
  };

  const clear = () => {
    setAccessToken("");
    setRefreshToken("");
    setAuthUser(null);
  };

  useEffect(() => {
    if (accessToken !== "" && refreshToken !== "") {
      setAuthUser({ accessToken, refreshToken });
    }
    setIsLoading(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        isLoading,
        login,
        clear,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
