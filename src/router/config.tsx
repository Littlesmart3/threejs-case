import { RouteObject } from 'react-router-dom';
import PointBall from '@/pages/point-ball/index';

/** 路由树 */
export const routerTree: RouteObject[] = [
  // 点球
  { path: 'point-ball', element: <PointBall /> }
];
