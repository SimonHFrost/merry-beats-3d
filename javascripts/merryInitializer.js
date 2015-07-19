// FIXME: Remove requestAnimationFrame global
/* global requestAnimationFrame */
var THREE = window.THREE

function MerryInitializer (merryColors) {
  this.merryColors = merryColors
}

MerryInitializer.prototype.SCREEN_HEIGHT = 600
MerryInitializer.prototype.SCREEN_WIDTH = 800

MerryInitializer.prototype.initialize = function () {
  var renderer = this._createRenderer()
  var renderLoop = this._createRenderLoop()
  var camera = this._createCamera(renderer)
  var scene = this._createScene()

  renderLoop.push(function () {
    renderer.render(scene, camera)
  })

  return {
    camera: camera,
    scene: scene
  }
}

MerryInitializer.prototype._createRenderer = function () {
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setClearColor(this.merryColors.secondaryColor)
  renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT)
  document.getElementById('renderer').appendChild(renderer.domElement)
  return renderer
}

MerryInitializer.prototype._createRenderLoop = function () {
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

MerryInitializer.prototype._createCamera = function (renderer) {
  var camera = new THREE.PerspectiveCamera(90, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 0.01, 1000)
  camera.position.y = 12
  var controls = new THREE.OrbitControls(camera, document.getElementById('renderer'))
  controls.noZoom = true
  controls.noPan = true
  controls.maxPolarAngle = Math.PI / 2.2
  return camera
}

MerryInitializer.prototype._createScene = function () {
  var scene = new THREE.Scene()

  var ambientLight = new THREE.AmbientLight(0xAAAAAA)
  scene.add(ambientLight)

  var directionalLight = new THREE.DirectionalLight(0x999999)
  directionalLight.position.set(1, 1, 1).normalize()
  scene.add(directionalLight)

  return scene
}
