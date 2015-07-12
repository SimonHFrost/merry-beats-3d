/* global THREE */
/* global MerryColors */
function MerryClickHandler (scene, camera, merryInitializer) {
  this.SCENE = scene
  this.CAMERA = camera
  this.merryInitializer = merryInitializer
  window.addEventListener('click', this.onClick)
}

MerryClickHandler.prototype.SCENE = ''
MerryClickHandler.prototype.CAMERA = ''

MerryClickHandler.prototype.onClick = function onClick (e) {
  var x = (e.clientX / this.merryInitializer.width) * 2 - 1
  var y = -(e.clientY / this.merryInitializer.height) * 2 + 1
  var mouse = new THREE.Vector2(x, y)
  var raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, this.camera)
  var intersects = raycaster.intersectObjects(this.scene.children)
  for (var i = 0; i < intersects.length; i++) {
    var cube = intersects[i].object
    if (cube.playClip) {
      cube.material = MerryColors.INACTIVE_COLOR
      cube.playClip = false
    } else {
      cube.material = MerryColors.ACTIVE_COLOR
      cube.playClip = true
    }
  }
}
