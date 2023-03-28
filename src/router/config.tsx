import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Scene = lazy(() => import('@/pages/scene'));
const PointBall = lazy(() => import('@/pages/point-ball'));
const OrbitControls = lazy(() => import('@/pages/orbit-controls'));
const LoaderGLTF = lazy(() => import('@/pages/loader-gltf'));
const GradientCube = lazy(() => import('@/pages/gradient-cube'));
const PieChart = lazy(() => import('@/pages/pie-chart'));

/** 路由树 */
export const routerTree: RouteObject[] = [
  // 场景
  { path: '/scene', element: <Scene /> },
  // 控制器
  { path: '/orbit-controls', element: <OrbitControls /> },
  // 点球
  { path: '/point-ball', element: <PointBall /> },
  // 加载gltf
  { path: '/loader-gltf', element: <LoaderGLTF /> },
  // 渐变立方体
  { path: '/gradient-cube', element: <GradientCube /> },
  // 饼状图
  { path: '/pie-chart', element: <PieChart /> }
];
