// FIXME: Remove requestAnimationFrame global
/* global requestAnimationFrame */
var THREE = window.THREE

function MerryInitializer (merryColors) {
  this.merryColors = merryColors
}

MerryInitializer.prototype.SCREEN_HEIGHT = 600
MerryInitializer.prototype.SCREEN_WIDTH = 800

MerryInitializer.prototype.createRenderer = function createRenderer () {
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setClearColor(this.merryColors.secondaryColor)
  renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT)
  document.getElementById('renderer').appendChild(renderer.domElement)
  return renderer
}

MerryInitializer.prototype.createCamera = function createCamera (renderer) {
  var camera = new THREE.PerspectiveCamera(90, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 0.01, 1000)
  camera.position.y = 12
  var controls = new THREE.OrbitControls(camera, document.getElementById('renderer'))
  controls.noZoom = true
  controls.noPan = true
  controls.maxPolarAngle = Math.PI / 2.2
  return camera
}

MerryInitializer.prototype.createRenderLoop = function createRenderLoop () {
  var renderLoop = []
  var before = null
  requestAnimationFrame(function animate (now) {
    requestAnimationFrame(animate)
    before = before || now - 1000 / 60
    var delta = Math.min(200, now - before)
    before = now
    renderLoop.forEach(function (renderLoop) {
      renderLoop(delta / 1000, now / 1000)
    })
  })
  return renderLoop
}

MerryInitializer.prototype.createLights = function createLights (scene) {
  var ambientLight = new THREE.AmbientLight(0xAAAAAA)
  scene.add(ambientLight)

  var directionalLight = new THREE.DirectionalLight(0x999999)
  directionalLight.position.set(1, 1, 1).normalize()
  scene.add(directionalLight)

  return scene
}

MerryInitializer.prototype.initialize = function initialize () {
  var renderer = this.createRenderer({alpha: true})
  var renderLoop = this.createRenderLoop()

  var scene = new THREE.Scene()
  var camera = this.createCamera(renderer)

  renderLoop.push(function () {
    renderer.render(scene, camera)
  })

  scene = this.createLights(scene)

  return {
    camera: camera,
    scene: scene
  }
}
