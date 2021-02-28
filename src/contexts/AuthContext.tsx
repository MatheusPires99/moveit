import { createContext, ReactNode, useState } from 'react';
import axios from 'axios';

type User = {
  name: string;
  login: string;
  avatar_url: string;
};

type AuthProviderPorps = {
  children: ReactNode;
};

type AuthContextData = {
  user: User;
  getGithubUser: (username: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderPorps) {
  const [user, setUser] = useState({} as User);

  async function getGithubUser(username: string) {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );

    setUser(response.data);
  }

  return (
    <AuthContext.Provider value={{ user, getGithubUser }}>
      {children}
    </AuthContext.Provider>
  );
}
