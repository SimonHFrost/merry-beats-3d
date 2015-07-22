var THREE = window.THREE

function MerryClickHandler (scene, camera, merryInitializer, merryColors, merryScheduler) {
  this.SCENE = scene
  this.CAMERA = camera
  this.merryInitializer = merryInitializer
  this.merryColors = merryColors
  this.merryScheduler = merryScheduler

  // NOTE: .bind(this) passes the prototype context to target function
  window.addEventListener('click', this.onClick.bind(this))
  document.getElementById('new-color').addEventListener('click', this.newColor.bind(this))
  document.getElementById('reset').addEventListener('click', this.reset.bind(this))
  document.getElementById('pause').addEventListener('click', this.pause.bind(this))
}

MerryClickHandler.prototype.SCENE = ''
MerryClickHandler.prototype.CAMERA = ''
MerryClickHandler.prototype.paused = false

MerryClickHandler.prototype.onClick = function (e) {
  var x = (e.clientX / this.merryInitializer.SCREEN_WIDTH) * 2 - 1
  var y = -(e.clientY / this.merryInitializer.SCREEN_HEIGHT) * 2 + 1
  var mouse = new THREE.Vector2(x, y)
  var raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, this.CAMERA)
  var intersects = raycaster.intersectObjects(this.SCENE.children)
  for (var i = 0; i < intersects.length; i++) {
    var cube = intersects[i].object
    if (cube.playClip) {
      // FIXME: Make this DRY
      cube.material = this.merryColors.INACTIVE_COLOR
      cube.playClip = false
    } else {
      cube.material = this.merryColors.ACTIVE_COLOR
      cube.playClip = true
    }
  }
}

MerryClickHandler.prototype.newColor = function () {
  this.merryColors.initialize()
}

MerryClickHandler.prototype.reset = function () {
  this.merryScheduler.resetAllCubes()
}

MerryClickHandler.prototype.pause = function () {
  this.merryScheduler.toggleScheduling()
}
