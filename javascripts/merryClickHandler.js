/* global THREE */
/* global MerryColors */

var MerryClickHandler = {
  scene: '',
  camera: '',

  onClick: function onClick (e) {
    var x = (e.clientX / MerryInitializer.width) * 2 - 1
    var y = -(e.clientY / MerryInitializer.height) * 2 + 1
    var mouse = new THREE.Vector2(x, y)
    var raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, this.camera)
    var intersects = raycaster.intersectObjects(this.scene.children)
    for (var i = 0; i < intersects.length; i++) {
      intersects[ i ].object.material = MerryColors.ACTIVE_COLOR
      intersects[ i ].object.playClip = true
    }
  },

  watchClicks: function watchClicks (scene, camera) {
    this.scene = scene
    this.camera = camera
    window.addEventListener('click', this.onClick)
  }
}
