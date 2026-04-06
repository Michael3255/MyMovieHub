import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  // Load the token from localStorage when the app first starts
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Saves the token to both state and localStorage
  function login(tokenValue) {
    setToken(tokenValue);
    localStorage.setItem("token", tokenValue);
  }

  // Removes the token from both state and localStorage
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}