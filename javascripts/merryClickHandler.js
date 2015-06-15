/* global THREE */

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

var merryClickHandler = {
  scene: '',
  onClick: function onClick (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(this.scene.children)

    for (var i = 0; i < intersects.length; i++) {
      intersects[ i ].object.material = merryColors.ACTIVE_COLOR
      intersects[ i ].object.playClip = true
    }
  },
  onMove: function onMove (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(this.scene.children)

    for (var i = 0; i < intersects.length; i++) {
      intersects[ i ].object.material = merryColors.CURSOR_COLOR
    }
  },
  watchClicks: function watchClicks () {
    this.scene = scene
    window.addEventListener('click', this.onClick)
    window.addEventListener('mousemove', this.onMove)
  }
}
