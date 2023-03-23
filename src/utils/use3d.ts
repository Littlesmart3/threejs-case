import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class BaseUse3d {
  /** 场景 */
  public scene: THREE.Scene;
  /** 相机 */
  public camera: THREE.PerspectiveCamera;
  /** 渲染器对象 */
  public renderer: THREE.WebGLRenderer;
  /** 控制器 */
  public controls: OrbitControls;
  /** 循环动画id */
  protected animationFrameKey: number;

  public constructor(dom: HTMLDivElement) {
    this.animationFrameKey = 0;
    // 初始化场景
    this.scene = new THREE.Scene();
    // 初始化相机
    this.camera = new THREE.PerspectiveCamera();
    // 初始化渲染器对象
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    dom.appendChild(this.renderer.domElement);
    // 初始化控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.resize();
  }

  /** 控制器基本配置 */
  public initControls(): void {
    this.controls.enableDamping = true; // 实现对相机运动的惯性和摩擦
    this.controls.dampingFactor = 0.05; // 设置阻尼因子
    this.controls.rotateSpeed = 0.5; // 设置转速
    this.controls.zoomSpeed = 0.5; // 设置变焦速度
    this.controls.panSpeed = 0.5; // 设置盘速度
  }

  /** 循环渲染 */
  public requestAnimationFrame(): void {
    // 渲染场景
    this.renderer.render(this.scene, this.camera);
    // 循环调用 animate 方法
    this.animationFrameKey = requestAnimationFrame(this.requestAnimationFrame.bind(this));
  }

  /** 关闭循环渲染 */
  public cancelAnimationFrame(): void {
    cancelAnimationFrame(this.animationFrameKey);
  }

  /** 窗口尺寸调整 */
  public resize(): void {
    this.camera.aspect = document.body.clientWidth / document.body.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(document.body.clientWidth, document.body.clientHeight);
  }
}
