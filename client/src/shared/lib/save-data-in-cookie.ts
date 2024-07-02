import Cookies from 'js-cookie';
import { setToken } from 'shared/api/base';
import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';

export const saveAccessToken = (token: string) => {
  Cookies.set('access_token', token, { expires: 1 });
  setToken();
};

export const saveUserData = (user: ICustomer | IVendor) => {
  const userJson = JSON.stringify(user);
  Cookies.set('user', userJson, { expires: 1 });
};

export const saveRole = (role: 'Customer' | 'Vendor') => {
  Cookies.set('role', role, { expires: 1 });
};
