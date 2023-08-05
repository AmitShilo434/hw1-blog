import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "../lib/cookie";

export interface User {
  name: string;
  email: string;
  token: string;
}

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface AuthProviderProps {
    // Define any additional props your AuthProvider component requires
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children } : any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user information from local storage on component mount
    // const storedUser = localStorage.getItem("user");

    const storedUser = getCookie("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (user: User | null) => {
    // Update user information and store in local storage
    setUser(user);
    // localStorage.setItem("user", JSON.stringify(user));
    setCookie("user", user, 7)
  };

  const authContextValue: AuthContextValue = {
    user,
    setUser: updateUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
