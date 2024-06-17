import { EnumRoutesName, ICustomRouteProps, routes } from "../shared/lib/routes"
import { MainPage } from "./main"

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: routes.main,
    element: <MainPage />,
    isAuth: true
  },
}