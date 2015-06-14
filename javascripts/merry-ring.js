var totalHalfBeats = 128

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

function createRing (numberOfPositions, width, color, soundName) {
  return {
    cubes: function makeCubes () {
      var cubes = []
      var positions = getPositionsAroundCircle(numberOfPositions, width)
      positions.forEach(function (position) {
        cubes.push(createCube(position[0], position[1], color))
      })
      return cubes
    }(),
    isThereSomethingAtPosition: function isThereSomethingAtPosition (position) {
      return (((numberOfPositions / totalHalfBeats) * position) % 1) == 0},
    playSound: function playSound () {
      new Audio('sounds/' + soundName + '.wav').play()
    }
  }
}
