import './cube.css'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  CubeGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'
// 场景（所有物体的容器）
var scene = new Scene()
// 相机 (决定了场景中那个角度的景色会显示出来)
var camera = new PerspectiveCamera(
  // field of view (单位为度), 表示一个人通过一个光学仪器所能观测到的区域范围
  // 在0-180degree的正常范围内，值越大，观测到的东西越多，但相应的物体会显得小
  75,
  window.innerWidth / window.innerHeight, // aspect ratio 屏幕纵横比
  0.1, // near clipping plane 离camera太近或太远的物体都不会被渲染
  1000 // far clipping plane
)
// 渲染器 (决定以怎样的方式来绘制渲染的结果)
var renderer = new WebGLRenderer()
// 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
// domElement元素, 表示渲染器中的画布, 所有的渲染都是画在domElement上的
document.body.appendChild(renderer.domElement)

// 创建一个正方体或长方体(前三个参数分别是长宽高)
var geometry = new CubeGeometry(2, 2, 2)
// 填色块
var material = new MeshBasicMaterial({ color: 0x0000ff })
var cube = new Mesh(geometry, material)
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
