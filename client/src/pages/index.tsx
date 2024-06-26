import { EnumRoutesName, ICustomRouteProps, routes } from 'app/router';
import { MainPage } from './main';
import { ProfileCustomer } from './profile-customer';
import { ProfileVendor } from './profile-vendor';

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: routes.main,
    element: <MainPage />,
    isAuth: true,
  },
  [EnumRoutesName.PROFILE_CUSTOMER]: {
    path: routes.profile_customer,
    element: <ProfileCustomer />,
    isAuth: true,
  },
  [EnumRoutesName.PROFILE_VENDOR]: {
    path: routes.profile_vendor,
    element: <ProfileVendor />,
    isAuth: true,
  },
};
