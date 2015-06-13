/* global THREE */
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
  return mesh
}

var positions = getPositionsAroundCircle(100, 10)
positions.forEach(function (position) {
  createCube(position[0], position[1])
})
