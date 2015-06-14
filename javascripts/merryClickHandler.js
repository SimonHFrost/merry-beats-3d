/* global THREE */

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

var merryClickHandler = {
  scene: '',
  onClick: function onMouseMove (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(this.scene.children)

    for (var i = 0; i < intersects.length; i++) {
      intersects[ i ].object.material = new THREE.MeshBasicMaterial({color: 'green'})
    }

    console.log(intersects)
  },
  watchClicks: function watchClicks () {
    this.scene = scene
    window.addEventListener('click', this.onClick)
  }
}
