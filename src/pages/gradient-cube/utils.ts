import * as THREE from 'three';
import { BaseUse3d } from '@/utils/use3d';
import { useTweakpane } from '@/hooks/useTweakpane';
// import fragmentShader from './shader/fragment.fs';
// import vertexShader from './shader/vertex.vs';
import { vertexShader, fragmentShader } from './shader';

let use3d: BaseUse3d;
// 调试面板实例
const pane = useTweakpane('scene');

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

//设置调试面板
function setTweakpane() {
  const controlsPanel = pane.get()?.addFolder({ title: 'controls(控制器)' });
  const controlsParams = {
    enableDamping: use3d.controls.enableDamping,
    dampingFactor: use3d.controls.dampingFactor,
    rotateSpeed: use3d.controls.rotateSpeed,
    zoomSpeed: use3d.controls.zoomSpeed,
    panSpeed: use3d.controls.panSpeed
  };

  // 控制器面板事件监听
  const cameraPanelEventListeners = () => {
    controlsPanel?.addInput(controlsParams, 'enableDamping').on('change', (e) => {
      use3d.controls.enableDamping = e.value;
      use3d.controls.update();
    });
    controlsPanel?.addInput(controlsParams, 'dampingFactor', { min: 0.001, max: 3, step: 0.001 }).on('change', (e) => {
      use3d.controls.dampingFactor = e.value;
      use3d.controls.update();
    });
    controlsPanel?.addInput(controlsParams, 'rotateSpeed', { min: 0.001, max: 3, step: 0.001 }).on('change', (e) => {
      use3d.controls.rotateSpeed = e.value;
      use3d.controls.update();
    });
    controlsPanel?.addInput(controlsParams, 'zoomSpeed', { min: 0.001, max: 3, step: 0.001 }).on('change', (e) => {
      use3d.controls.zoomSpeed = e.value;
      use3d.controls.update();
    });
    controlsPanel?.addInput(controlsParams, 'panSpeed', { min: 0.001, max: 3, step: 0.001 }).on('change', (e) => {
      use3d.controls.panSpeed = e.value;
      use3d.controls.update();
    });
  };

  cameraPanelEventListeners();
}

// 初始化
function init(dom: HTMLDivElement) {
  use3d = new BaseUse3d(dom);
  // 设置基本控制器配置
  use3d.initControls();
  // 设置渲染器尺寸
  use3d.renderer.setSize(window.innerWidth, window.innerHeight);

  // 设置摄像机位置
  use3d.camera.position.z = cameraConfig.positionZ;

  // 创建一个立方体
  const geometry = new THREE.BoxGeometry();

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
  const cube = new THREE.Mesh(geometry, material);

  // 将立方体添加到场景中
  use3d.scene.add(cube);
  // 自动围绕目标旋转
  use3d.controls.autoRotate = true;
  use3d.controls.target = cube.position;
  use3d.setRenderList('autoRotation', () => {
    use3d.controls.update();
  });
}

// 主函数
export default function main(dom: HTMLDivElement) {
  init(dom);
  // setTweakpane();
}
