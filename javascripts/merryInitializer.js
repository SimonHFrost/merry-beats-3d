/* global THREE */
/* global requestAnimationFrame */

var MerryInitializer = {
  height: 600,
  width: 800,

  createRenderer: function createRenderer () {
    renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    renderer.setClearColor(third)
    renderer.setSize(this.width, this.height)
    document.getElementById('renderer').appendChild(renderer.domElement)
    return renderer
  },

  createCamera: function createCamera (renderer) {
    var camera = new THREE.PerspectiveCamera(90, this.width / this.height, 0.01, 1000)
    camera.position.y = 12
    // camera.lookAt(new THREE.Vector3(0, 0, 0))
    // NOTE: orbit controls must be assigned even though it's not used
    var controls = new THREE.OrbitControls(camera)
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
    var ambientLight = new THREE.AmbientLight(0xAAAAAA)
    scene.add(ambientLight)

    var directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    return scene
  },

  initialize: function initialize () {
    var scene
    renderer
    var renderLoop

    var renderer = this.createRenderer({alpha: true})
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
