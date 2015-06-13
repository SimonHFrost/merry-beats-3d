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

var totalHalfBeats = 64

function createRing (numberOfPositions, width, color) {
  var positions = getPositionsAroundCircle(numberOfPositions, width)
  positions.forEach(function (position) {
    createCube(position[0], position[1], color)
  })

  return {
    positions: positions,
    isThereSomethingAtPosition: function isThereSomethingAtPosition (position) {
    return (((positions.length / totalHalfBeats) * position) % 1) == 0}}
}

var allRings = [createRing(32, 6, 'blue'), createRing(16, 4, 'green'), createRing(8, 2, 'red')]

var count = 0
setInterval(function () {
  checkAllRings(count++)
}, 1000)

function checkAllRings (number) {
  console.log("I'm at number " + number)
  allRings.forEach(function (ring) {
    mouseDown()
  })
}
