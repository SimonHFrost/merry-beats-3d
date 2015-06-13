/* global THREE */
/* global Audio */
/* global initialize */

var scene = initialize()

var SIZE = 0.5
var OFFSET = 0.5
function createCube (x, z) {
  var geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE)
  var material = new THREE.MeshNormalMaterial()
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = -OFFSET + x
  mesh.position.y = 0
  mesh.position.z = -OFFSET + z

  scene.add(mesh)
}

createCube(0, 0)
createCube(0, 1)
createCube(1, 0)
createCube(1, 1)

document.addEventListener('mousedown', mouseDown, false)
function mouseDown (event) {
  var audio = new Audio('sounds/snare.wav')
  audio.play()
}
