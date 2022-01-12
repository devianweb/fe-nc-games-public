import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userLogin = (username) => {
    setUser(username);
  };

  const userLogout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
