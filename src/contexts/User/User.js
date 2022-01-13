import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    let username = localStorage.getItem("user");
    if (username === null) {
      localStorage.setItem("user", "");
      username = localStorage.getItem("user");
    }
    setUser(username);
  }, []);

  const userLogin = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const userLogout = () => {
    setUser("");
    localStorage.setItem("user", "");
  };

  return (
    <UserContext.Provider value={{ user, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
