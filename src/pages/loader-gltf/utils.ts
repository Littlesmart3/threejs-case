import * as THREE from 'three';
import { BaseUse3d } from '@/utils/use3d';
import { useTweakpane } from '@/hooks/useTweakpane';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

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
  const material = new THREE.MeshPhysicalMaterial({ color: modelConfig.color });
  const cube = new THREE.Mesh(geometry, material);

  // 将立方体添加到场景中
  use3d.scene.add(cube);
}

// 主函数
export default function main(dom: HTMLDivElement) {
  init(dom);
  // setTweakpane();
}

// 加载 gltf、glb 模型
export function loaderGLTF(file: string | ArrayBuffer) {
  use3d.clearScene();
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  // 使用谷歌的 Draco 编码几何数据的插件
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.parse(file, '', (gltf) => {
    use3d.scene.add(gltf.scene);
    use3d.initLight();
  });
}
