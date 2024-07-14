import { EnumRoutesName } from "shared/config";

export const getProfileRoutes = () =>
  Object.values(EnumRoutesName)
    .filter((route) => route === EnumRoutesName.ORDERS);
