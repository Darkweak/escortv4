import jwt_decode from 'jwt-decode';

const tokenName = 'token';

export const isLogged = () => {
  return !!localStorage.getItem(tokenName);
};

export const getToken = () => {
  return localStorage.getItem(tokenName);
};

export const getUsername = () => {
  return jwt_decode(getToken()).username;
};

export const loginUser = (value) => {
  localStorage.setItem(tokenName, value)
};

export const logoutUser = () => {
  localStorage.removeItem(tokenName)
};
