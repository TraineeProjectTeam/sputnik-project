import { ReactNode } from 'react';
import { EnumRoutesName, TypeRole } from 'shared/config';

export interface IRoute {
  url: string;
  label: string;
}

export interface ICustomRouteProps {
  path: string;
  element: ReactNode;
  isAuth: boolean;
  role?: TypeRole;
}

export interface IRouterProps {
  pages: Record<EnumRoutesName, ICustomRouteProps>;
}
