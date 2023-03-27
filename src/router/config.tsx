import { RouteObject } from 'react-router-dom';
import PointBall from '@/pages/point-ball/index';
import Scene from '@/pages/scene/index';
import OrbitControls from '@/pages/orbit-controls/index';
import LoaderGLTF from '@/pages/loader-gltf/index';

/** 路由树 */
export const routerTree: RouteObject[] = [
  // 场景
  { path: '/scene', element: <Scene /> },
  // 控制器
  { path: '/orbit-controls', element: <OrbitControls /> },
  // 点球
  { path: '/point-ball', element: <PointBall /> },
  // 加载gltf
  { path: '/loader-gltf', element: <LoaderGLTF /> }
];
