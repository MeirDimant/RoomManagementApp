import React, { useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { getMe } from "../API/LoginAndRegister";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userData, setUserData] = useState(undefined);

  const handleUser = (user) => {
    setUserData(user);
  };

  const handleIsAuthenticated = (state) => {
    setIsAuthenticated(state);
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      handleIsAuthenticated(null);
      const response = await getMe();
      if (response.id) {
        setUserData(response);
        handleIsAuthenticated(true);
      } else {
        console.error(response);
        handleIsAuthenticated(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: handleUser,
        isAuthenticated,
        setIsAuthenticated: handleIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
