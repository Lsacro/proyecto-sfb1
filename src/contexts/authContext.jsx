//Este estado se va a encargar de manejar nuestro user a nivel global
//Van un estado donde puedan guardar el usuario y una funcion para setear el usuario
//Xq en todas las paginas debemos verificar si hay un usuario logeado o no

import { createContext, useState } from "react";
import {
  isAuthenticated,
  removeToken,
  setToken,
} from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  const login = (token) => {
    setToken(token);
    setAuth(true);
  };

  const logout = () => {
    removeToken();
    setAuth(false);
  };

  const valuesToShare = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valuesToShare}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
