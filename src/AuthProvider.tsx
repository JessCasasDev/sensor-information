import { createContext, PropsWithChildren, useContext, useState } from "react";
import axios from "axios";

interface ContextValue {
  token: null | string;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<ContextValue>({
  token: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

interface AuthProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<AuthProps>) => {
  const [token, setToken] = useState(null);
  const stagingURL = process.env.REACT_APP_stagingURL;
  const clientId = process.env.REACT_APP_clientId;
  const clientSecret = process.env.REACT_APP_clientSecret;
  const redirectUri = `${stagingURL}/api/auth/redirect`;
  const authorizeUrl = `${stagingURL}/api/auth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const access = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const result = await axios.post(
        authorizeUrl,
        {
          email,
          password,
        },
        { headers }
      );

      return result.data.Authcode;
    } catch (error) {
      return undefined;
    }
  };

  const getToken = async (authcode: string) => {
    const tokenURL = `${stagingURL}/api/auth/token?grant_type=authorization_code&code=${authcode}&redirect_uri=/&client_id=${clientId}&client_secret=${clientSecret}`;

    const result = await axios.post(tokenURL, {}, { headers });

    return result.data;
  };

  const login = ({ email, password }: { email: string; password: string }) =>
    access({ email, password })
      .then((response: string) => getToken(response))
      .then((token) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;

        setToken(token.access_token);
      });

  const logout = () => {
    setToken(null);
    axios.defaults.headers.common["Authorization"] = null;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
