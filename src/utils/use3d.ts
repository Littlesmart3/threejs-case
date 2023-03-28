import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

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
  /** 循环渲染列表 */
  protected renderList: { key: string; function: Function }[];

  public constructor(dom: HTMLDivElement) {
    this.animationFrameKey = 0;
    this.renderList = [];
    // 创建场景
    this.scene = new THREE.Scene();
    // 创建相机
    this.camera = new THREE.PerspectiveCamera();
    // 创建渲染器对象
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    //  添加 canvas dom
    this.appendChild(dom);
    // 创建控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 初始化配置
    this.init();
    // 窗口尺寸调整
    window.addEventListener('resize', () => this.resize(dom));
  }

  // 初始化
  private init() {
    // 默认配置灯光
    this.initLight();
    // 初始化控制器
    this.initControls();
    // 渲染
    this.render();
    this.scene.background = new THREE.Color('#fff');
  }

  private appendChild(dom: HTMLDivElement) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    dom.appendChild(this.renderer.domElement);
  }

  // 初始化环境贴图
  private initHDR() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('//oss.baoxiaohe.com/rapid_render/image/3e1a227acd3b8d6273171c53ddcb54bd.hdr', (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();
      // this.scene.background = envMap;
      this.scene.environment = envMap;
      this.scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.material.color?.convertSRGBToLinear();
          if (obj.material.map) obj.material.map.encoding = THREE.sRGBEncoding;
          if (obj.material.emissiveMap) obj.material.emissiveMap.encoding = THREE.sRGBEncoding;
          if (obj.material.emissiveMap) obj.material.emissiveMap.needsUpdate = true;
        }
      });
    });
  }

  // 默认配置灯光
  public initLight() {
    // 创建环境光
    const ambientLight = new THREE.AmbientLight('#ffffff');
    // 创建一个平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    ambientLight.intensity = 1;
    directionalLight.intensity = 1;

    // 设置平行光的位置
    directionalLight.position.set(0, 10, 0);

    // 将环境光添加到场景中
    this.scene.add(ambientLight);
    // // 将平行光添加到场景中
    // this.scene.add(directionalLight);
    // 初始化hdr
    this.initHDR();
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
  public render(): void {
    //渲染自定义function
    this.renderList.forEach((i) => i.function());
    // 渲染场景
    this.renderer.render(this.scene, this.camera);
    // 循环调用 animate 方法
    this.animationFrameKey = requestAnimationFrame(this.render.bind(this));
  }

  public setRenderList(key: string, func: Function) {
    const item = this.renderList.find((i) => i.key === key);
    if (!item?.function) this.renderList.push({ key: key, function: func });
    else throw new Error(`已经存在key为${key}的function`);
  }

  /** 关闭循环渲染 */
  public cancelAnimationFrame(): void {
    cancelAnimationFrame(this.animationFrameKey);
  }

  /** 窗口尺寸调整 */
  public resize(dom: HTMLDivElement): void {
    this.camera.aspect = dom.clientWidth / dom.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(dom.clientWidth, dom.clientHeight);
  }

  /** 清空场景内的所有数据 */
  public clearScene(): void {
    // 遍历场景中的所有对象并删除
    this.scene.traverse(function (object) {
      // 删除网格对象并释放内存
      if (object instanceof THREE.Mesh && object.isMesh) {
        object.geometry.dispose();
        object.material.dispose();
      }
    });

    // 从场景中删除所有子元素
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    // 释放其他内存占用
    this.renderer.dispose();
  }
}
