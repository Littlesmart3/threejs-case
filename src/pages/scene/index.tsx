import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTweakpane } from '@/hooks/useTweakpane';

const pane = useTweakpane('scene');

// Three.js 场景组件
const Scene: React.FC = () => {
  const domRef = useRef<HTMLDivElement>(null);
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;

  // 循环动画id
  let animationFrameKey = 0;

  // 相机基本参数
  const cameraConfig = {
    /** 视角 */
    fov: 75,
    /** 近剪裁面 */
    near: 0.1,
    /** 远剪裁面 */
    far: 1000,
    /** 摄像机位置 -- z */
    positionZ: 5
  };

  // 相机基本参数
  const modelConfig = {
    /** 立方体旋转偏移量 x */
    rotation: 0.001,
    /** 颜色 */
    color: '#914a62'
  };

  // 1.创建场景对象
  const scene = new THREE.Scene();
  // 2.创建摄像机对象
  const camera = new THREE.PerspectiveCamera(cameraConfig.fov, width / height, cameraConfig.near, cameraConfig.far);
  // 3.创建渲染器对象
  let renderer: THREE.WebGLRenderer;
  // 4.创建模型
  let cube: THREE.Mesh;

  /** 初始化 */
  function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // 设置渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    domRef.current?.appendChild(renderer.domElement);

    // 设置摄像机位置
    camera.position.z = cameraConfig.positionZ;

    // 创建一个立方体
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: modelConfig.color });
    cube = new THREE.Mesh(geometry, material);

    // 将立方体添加到场景中
    scene.add(cube);

    // 第一次调用渲染函数
    render();
  }

  // 渲染
  function render() {
    cancelAnimationFrame(animationFrameKey);
    // 使立方体旋转起来
    cube.rotation.x += modelConfig.rotation;
    cube.rotation.y += modelConfig.rotation;
    // 渲染场景
    renderer.render(scene, camera);
    // 循环调用渲染函数
    animationFrameKey = requestAnimationFrame(render);
  }

  // 窗口尺寸调整
  function resize() {
    camera.aspect = document.body.clientWidth / document.body.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);
  }

  //设置调试面板
  function setTweakpane() {
    const cameraPanel = pane?.addFolder({ title: 'camera' });
    const modelPanel = pane?.addFolder({ title: 'model' });
    const cameraParams = { 视角: cameraConfig.fov, near: cameraConfig.near, far: cameraConfig.far };
    const modelParams = { 旋转: modelConfig.rotation, 颜色: modelConfig.color };

    // 相机面板事件监听
    const cameraPanelEventListeners = () => {
      cameraPanel?.addInput(cameraParams, '视角', { min: 1, max: 179, step: 1 }).on('change', (e) => {
        camera.fov = e.value;
        // 重新计算相机的投影矩阵
        camera.updateProjectionMatrix();
      });
      cameraPanel?.addInput(cameraParams, 'near', { min: 0, max: 10, step: 0.00001 }).on('change', (e) => {
        camera.near = e.value;
        camera.updateProjectionMatrix();
      });
      cameraPanel?.addInput(cameraParams, 'far', { min: 0, max: 10000, step: 0.00001 }).on('change', (e) => {
        camera.far = e.value;
        camera.updateProjectionMatrix();
      });
    };

    // 相机面板事件监听
    const modelPanelEventListeners = () => {
      modelPanel?.addInput(modelParams, '旋转', { min: 0, max: 0.1, step: 0.00001 }).on('change', (e) => {
        modelConfig.rotation = e.value;
        render();
      });
      modelPanel?.addInput(modelParams, '颜色').on('change', (e) => {
        if (cube.material instanceof THREE.MeshBasicMaterial) {
          // 通过mesh对象访问其材质，并将其颜色修改为其他颜色
          cube.material.color.set(e.value);
          render();
        }
      });
    };

    cameraPanelEventListeners();
    modelPanelEventListeners();
  }

  useEffect(() => {
    init();
    setTweakpane();
    window.addEventListener('resize', resize);
  }, []);
  return <div ref={domRef} />;
};

// 导出组件
export default Scene;
