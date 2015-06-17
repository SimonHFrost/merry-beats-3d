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
    // NOTE: orbit controls must be assigned even though it's not used
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
      var delta = Math.min(200, now - before)
      before = now
      renderLoop.forEach(function (renderLoop) {
        renderLoop(delta / 1000, now / 1000)
      })
    })
    return renderLoop
  },

  createLights: function createLights (scene) {
    var ambientLight = new THREE.AmbientLight(0x777777)
    scene.add(ambientLight)

    var directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    return scene
  },

  initialize: function initialize () {
    var scene
    var renderer
    var renderLoop

    renderer = this.createRenderer()
    renderLoop = this.createRenderLoop()

    scene = new THREE.Scene()
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
}
