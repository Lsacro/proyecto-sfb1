const TOKEN_KEY = "authtoken";

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const isAuthenticated = () => {
  return !!getToken();
};

export { setToken, getToken, removeToken, isAuthenticated };
