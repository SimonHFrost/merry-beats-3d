/* global THREE */
/* global initialize */

var scene = initialize()

var SIZE = 0.5
var OFFSET = 0.5
function createCube (x, z, color) {
  var geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE)
  var material = new THREE.MeshBasicMaterial({color: color})
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = -OFFSET + x
  mesh.position.y = 0
  mesh.position.z = -OFFSET + z

  scene.add(mesh)
  return mesh
}

function createRing (numberOfPositions, width, color) {
  var positions = getPositionsAroundCircle(numberOfPositions, width)
  positions.forEach(function (position) {
    createCube(position[0], position[1], color)
  })
}

createRing(100, 10, 'blue')
createRing(50, 7, 'green')
createRing(20, 3, 'red')
