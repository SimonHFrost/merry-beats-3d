/* global THREE */
/* global merryColors */

var merryClickHandler = {
  scene: '',
  camera: '',
  onClick: function onClick (e) {
    var x = (e.clientX / window.innerWidth) * 2 - 1
    var y = -(e.clientY / window.innerHeight) * 2 + 1
    var mouse = new THREE.Vector2(x, y)
    var raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, this.camera)
    var intersects = raycaster.intersectObjects(this.scene.children)
    for (var i = 0; i < intersects.length; i++) {
      intersects[ i ].object.material = merryColors.ACTIVE_COLOR
      intersects[ i ].object.playClip = true
    }
  },
  watchClicks: function watchClicks () {
    this.scene = scene
    this.camer = camera
    window.addEventListener('click', this.onClick)
  }
}
