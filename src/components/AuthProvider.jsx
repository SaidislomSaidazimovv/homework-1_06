import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const checkAuth = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user`);

      const data = await res.data;
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await axios.put(`http://localhost:3000/user`);
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
