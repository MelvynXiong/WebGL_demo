import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import './cube.css'

let renderer: any = null // 渲染器
let camera: any = null // 相机
let scene: any = null // 场景
// 类型断言，此处如果不断言，container有可能为null, 而null是没有属性的
const container = document.getElementById('canvas-frame') as HTMLElement
const width = container.clientWidth
const height = container.clientHeight

// 初始化渲染器
function initRenderer() {
  renderer = new WebGLRenderer() // 创建一个渲染器实例
  renderer.setSize(width, height) // 设置canvas画布的大小
  container.appendChild(renderer.domElement) // domElement是一个canvas, 所有输出都是画在canvas上
  renderer.setClearColor('#ffffff', 1.0) // 颜色和透明度
}
// 初始化camera (决定了场景中那个角度的景色会显示出来)
function initCamera() {
  // 透视图模式下的相机
  camera = new PerspectiveCamera(
    // field of view (单位为度), 表示一个人通过一个光学仪器所能观测到的区域范围
    // 在0-180degree的正常范围内，值越大，观测到的东西越多，但相应的物体会显得小
    45,
    width / height, // aspect ratio 屏幕纵横比
    1, // near clipping plane 离camera太近或太远的物体都不会被渲染
    10000 // far clipping plane
  )
  // 设置camera的当前位置
  camera.position.x = 0
  camera.position.y = 1000
  camera.position.z = 0
  // 设置camera的方向
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 1;
  camera.lookAt({
    x : 0,
    y : 0,
    z : 0
});
}

// 场景（所有物体的容器）
scene = new Scene()

// 创建一个正方体或长方体(前三个参数分别是长宽高)
const geometry = new BoxGeometry(2, 2, 2)
// 填色块
const material = new MeshBasicMaterial({ color: 0x0000ff })
const cube = new Mesh(geometry, material)
// 添加创建好的物体到场景中
scene.add(cube)
camera.position.z = 5 // 当该值为0，时camera和cube重叠在一起，该值越大，说明相机离场景距离越远，物体也就看起来越小
function render() {
  // 使浏览器调用一次参数中的函数，形成循环（60fps）
  // 使用该函数来进行不间断渲染而不用setInterval, 是因为当用户暂时切换到其他tab时，渲染会暂停，节约资源
  requestAnimationFrame(render)
  cube.rotation.x += 0.1
  cube.rotation.y += 0.1
  // 结合相机和场景来得到结果画面
  renderer.render(scene, camera)
}
render()
