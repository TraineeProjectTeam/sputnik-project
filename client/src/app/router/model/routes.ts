export enum EnumRoutesName {
  MAIN = 'main',
  PROFILE_CUSTOMER = 'profile_customer',
  PROFILE_VENDOR = 'profile_vendor',
}

export const routes: Record<EnumRoutesName, string> = {
  [EnumRoutesName.MAIN]: '/',
  [EnumRoutesName.PROFILE_CUSTOMER]: '/profile-customer',
  [EnumRoutesName.PROFILE_VENDOR]: '/profile-vendor',
};
