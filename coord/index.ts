import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Geometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  VertexColors,
  WebGLRenderer,
} from 'three'

let renderer: any // 渲染器
let camera: any // 相机
let scene: any // 场景

// 类型断言，此处如果不断言，container有可能为null, 而null是没有属性的
const container = document.getElementById('canvas-frame') as HTMLElement
const width = container.clientWidth
const height = container.clientHeight

// 初始化渲染器
function initRenderer() {
  renderer = new WebGLRenderer({
    antialias: true, // 抗锯齿，边缘柔化
  }) // 创建一个渲染器实例
  renderer.setSize(width, height) // 设置canvas画布的大小
  container.appendChild(renderer.domElement) // domElement是一个canvas, 所有输出都是画在canvas上
  renderer.setClearColor('#fff', 1.0) // 颜色和透明度
}
// 初始化camera (决定了场景中那个角度的景色会显示出来)
function initCamera() {
  // 透视图模式下的相机
  camera = new PerspectiveCamera(
    // field of view (单位为度), 表示一个人通过一个光学仪器所能观测到的区域范围
    // 在0-180degree的正常范围内，值越大，观测到的东西越多，但相应的物体会显得小
    90,
    width / height, // aspect ratio 屏幕纵横比
    0.1, // near clipping plane 离camera太近或太远的物体都不会被渲染
    1000 // far clipping plane
  )
  // 设置camera的当前位置 默认情况下，camera和scene位置重合
  camera.position.x = 5
  camera.position.y = 5
  camera.position.z = 5
  // 设置坐标轴的方向, 默认是y轴向上, 改变3d坐标系的方向
  // camera.up.x = 0
  // camera.up.y = 0
  // camera.up.z = 1
  //  设置相机的焦点
  // camera.lookAt({
  //   x: 0,
  //   y: 0,
  //   z: 0,
  // })
}

// 初始化场景（所有物体的容器）
function initScene() {
  scene = new Scene()
}

// 初始化光线
function initLight() {
  const light = new DirectionalLight('#F00', 1.0)
  // Vector3对象的方法
  light.position.set(100, 100, 200)
  scene.add(light)
}
// 初始化待展示的对象
function initX() {
  // 定义一个几何体的参数
  const geometry = new Geometry()
  // 定义一个集合体的样式
  const material = new LineBasicMaterial({ color: '#f00' })

  const p1 = new Vector3(-10, 0, 0)
  const p2 = new Vector3(10, 0, 0)
  geometry.vertices.push(p1)
  geometry.vertices.push(p2)
  const line = new Line(geometry, material)
  // 添加创建好的物体到场景中
  scene.add(line)
}
function initY() {
  // 定义一个几何体的参数
  const geometry = new Geometry()
  // 定义一个集合体的样式
  const material = new LineBasicMaterial({ color: '#0f0' })

  const p1 = new Vector3(0, -10, 0)
  const p2 = new Vector3(0, 10, 0)
  geometry.vertices.push(p1)
  geometry.vertices.push(p2)
  const line = new Line(geometry, material)
  // 添加创建好的物体到场景中
  scene.add(line)
}
function initZ() {
  // 定义一个几何体的参数
  const geometry = new Geometry()
  // 定义一个集合体的样式
  const material = new LineBasicMaterial({ color: '#00f' })

  const p1 = new Vector3(0, 0, -10)
  const p2 = new Vector3(0, 0, 10)
  geometry.vertices.push(p1)
  geometry.vertices.push(p2)
  const line = new Line(geometry, material)
  // 添加创建好的物体到场景中
  scene.add(line)
}

function render() {
  // 清空上一次的渲染结果
  renderer.clear()
  // 结合相机和场景来得到结果画面
  renderer.render(scene, camera)
  // 使浏览器调用一次参数中的函数，形成循环（60fps）
  // 使用该函数来进行不间断渲染而不用setInterval, 是因为当用户暂时切换到其他tab时，渲染会暂停，节约资源
  requestAnimationFrame(render)
}

function start() {
  initRenderer()
  initCamera()
  initScene()
  initX()
  initY()
  initZ()
  render()
}

start()
