/* global THREE */
/* global requestAnimationFrame */

var merryInitializer = {
  createRenderer: function createRenderer () {
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    return renderer
  },

  createCamera: function createCamera (renderer) {
    var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000)
    camera.position.y = 12
    var controls = new THREE.OrbitControls(camera)

    window.addEventListener('resize', function () {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }, false)
    return camera
  },

  createRenderLoop: function createRenderLoop () {
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
  },

  initialize: function initialize () {
    var scene
    var camera
    var renderer
    var renderLoop

    renderer = this.createRenderer()
    renderLoop = this.createRenderLoop()

    scene = new THREE.Scene()
    camera = this.createCamera(renderer)

    renderLoop.push(function () {
      renderer.render(scene, camera)
    })

    return scene
  }
}
