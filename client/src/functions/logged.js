const tokenName = 'token';

export const isLogged = () => {
  return !!localStorage.getItem(tokenName);
};

export const loginUser = (value) => {
  localStorage.setItem(tokenName, value)
};

export const logoutUser = () => {
  localStorage.removeItem(tokenName)
};
