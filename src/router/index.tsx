import { FC } from 'react';
import { Routes, Route, Navigate, RouteObject } from 'react-router-dom';

interface IProps {
  routes: RouteObject[];
}

/** 路由 */
const RouterView: FC<IProps> = (props) => {
  const defaultRoute = props.routes[0];
  return (
    <Routes>
      <Route path='/' element={<Navigate to={defaultRoute.path || '/'} replace />} />
      {props.routes.map((i) => (
        <Route key={i.path} path={i.path} element={i.element} />
      ))}
    </Routes>
  );
};

export default RouterView;
