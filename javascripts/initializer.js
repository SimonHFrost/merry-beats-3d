/* global THREE */
/* global requestAnimationFrame */

function createRenderer () {
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setClearColor(new THREE.Color('lightgrey'), 1)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  return renderer
}

function createCamera (renderer) {
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera.position.y = 12
  var controls = new THREE.OrbitControls(camera)

  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }, false)
  return camera
}

function createRenderLoop () {
  var renderLoop = []
  var before = null
  requestAnimationFrame(function animate (now) {
    requestAnimationFrame(animate)
    before = before || now - 1000 / 60
    var deltaMsec = Math.min(200, now - before)
    before = now
    renderLoop.forEach(function (renderLoop) {
      renderLoop(deltaMsec / 1000, now / 1000)
    })
  })
  return renderLoop
}

function initialize () {
  var scene
  var camera
  var renderer
  var renderLoop

  renderer = createRenderer()
  renderLoop = createRenderLoop()

  scene = new THREE.Scene()
  camera = createCamera(renderer)

  renderLoop.push(function () {
    renderer.render(scene, camera)
  })

  return scene
}
