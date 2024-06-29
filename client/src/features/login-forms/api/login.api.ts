import Cookies from 'js-cookie';
import { setToken } from 'shared/api/base';

export const saveAccessToken = (token: string) => {
  Cookies.set('access_token', token, { expires: 7 });
  setToken();
};
