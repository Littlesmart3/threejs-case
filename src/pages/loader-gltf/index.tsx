import React, { useRef, useEffect, ChangeEvent } from 'react';
import use3d, { loaderGLTF } from './utils';
import './style.scss';

// Three.js 场景组件
const Scene: React.FC = () => {
  // 获取容器
  const domRef = useRef<HTMLDivElement>(null);

  // 选择文件
  function chooseFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return alert('上传文件有误！');
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => fileReader.result && loaderGLTF(fileReader.result);
  }

  useEffect(() => use3d(domRef.current!), []);
  return (
    <div className='loader-gltf' ref={domRef}>
      <input type='file' accept='.glb,.gltf' onChange={chooseFile} />
    </div>
  );
};

// 导出组件
export default Scene;
