import Cookies from 'js-cookie';

export const getCookiesUserData = () => {
  const userJson = Cookies.get('user');
  if (!userJson) {
    return null;
  }
  return JSON.parse(userJson);
};
