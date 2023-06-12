import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
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

  const authContextValue: AuthContextValue = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
