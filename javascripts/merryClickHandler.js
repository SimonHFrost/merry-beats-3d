var THREE = window.THREE

function MerryClickHandler (scene, camera, merryInitializer, merryColors) {
  this.SCENE = scene
  this.CAMERA = camera
  this.merryInitializer = merryInitializer
  this.merryColors = merryColors

  // NOTE: .bind(this) passes the prototype context to target function
  window.addEventListener('click', this.onClick.bind(this))
  document.getElementById('new-color').addEventListener('click', function () {
    merryColors.initialize()
  })
}

MerryClickHandler.prototype.SCENE = ''
MerryClickHandler.prototype.CAMERA = ''

MerryClickHandler.prototype.onClick = function onClick (e) {
  var x = (e.clientX / this.merryInitializer.SCREEN_WIDTH) * 2 - 1
  var y = -(e.clientY / this.merryInitializer.SCREEN_HEIGHT) * 2 + 1
  var mouse = new THREE.Vector2(x, y)
  var raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, this.CAMERA)
  var intersects = raycaster.intersectObjects(this.SCENE.children)
  for (var i = 0; i < intersects.length; i++) {
    var cube = intersects[i].object
    if (cube.playClip) {
      cube.material = this.merryColors.INACTIVE_COLOR
      cube.playClip = false
    } else {
      cube.material = this.merryColors.ACTIVE_COLOR
      cube.playClip = true
    }
  }
}
