import React, { useRef, useEffect, ChangeEvent } from 'react';
import use3d from './utils';

// Three.js 场景组件
const GradientCube: React.FC = () => {
  // 获取容器
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => use3d(domRef.current!), []);
  return <div ref={domRef} />;
};

// 导出组件
export default GradientCube;
