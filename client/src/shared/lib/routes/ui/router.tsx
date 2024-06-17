import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "../model/routes"
import { IRouterProps } from "../model/routes.types";

export const Router = (props: IRouterProps) => {
  const { pages } = props;

  return (
    <Routes>
      {Object.values(pages).map(page => {
        return (page.isAuth ?
          <Route key={`route_${page.path}`} path={page.path} element={page.element} />
          : false
        )
      })}
      <Route
        key={`route_default`}
        path="*"
        element={<Navigate to={routes.main} />}
      />
    </Routes>
  );
}