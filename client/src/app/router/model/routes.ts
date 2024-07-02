export enum EnumRoutesName {
  MAIN = 'main',
  PROFILE_CUSTOMER = 'profile_customer',
  PROFILE_VENDOR = 'profile_vendor',
  LOGIN = 'login',
  REGISTER = 'register',
  MAP = 'map',
}

export const routes: Record<EnumRoutesName, string> = {
  [EnumRoutesName.MAIN]: '/',
  [EnumRoutesName.PROFILE_CUSTOMER]: '/profile-customer',
  [EnumRoutesName.PROFILE_VENDOR]: '/profile-vendor',
  [EnumRoutesName.LOGIN]: '/login',
  [EnumRoutesName.REGISTER]: '/register',
  [EnumRoutesName.MAP]: '/map',
};
