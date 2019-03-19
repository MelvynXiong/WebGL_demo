import {
  DirectionalLight,
  Geometry,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
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
  camera.position.x = 0
  camera.position.y = 1000
  camera.position.z = 0
  // 设置坐标轴的方向, 默认是y轴向上, 改变3d坐标系的方向
  // camera.up.x = 0
  // camera.up.y = 0
  // camera.up.z = 1
  //  设置相机面对的方向, lookat方向默认是z轴负半轴
  camera.lookAt(0, 0, 0)
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
function initObject() {
  const geometry = new Geometry()
  geometry.vertices.push(new Vector3(-500, 0, 0))
  geometry.vertices.push(new Vector3(500, 0, 0))
  for (let i = 0; i <= 20; i++) {
    const xLine = new Line(geometry, new LineBasicMaterial({ color: 'red' }))
    const yLine = new Line(geometry, new LineBasicMaterial({ color: 'blue' }))
    xLine.position.z = i * 50 - 500
    yLine.position.x = i * 50 - 500
    yLine.rotation.y = Math.PI/2
    scene.add(xLine)
    scene.add(yLine)
  }
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
  initLight()
  initObject()
  render()
}

start()
