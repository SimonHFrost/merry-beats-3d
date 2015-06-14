var SIZE = 0.5

function createCube (x, z, color) {
  var geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE)
  var material = new THREE.MeshBasicMaterial({color: color})
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = z

  mesh.lookAt(new THREE.Vector3(0, 0, 0))

  scene.add(mesh)
  return mesh
}

function createRing (numberOfPositions, width, color, soundName) {
  return {
    cubes: function makeCubes () {
      var cubes = []
      var positions = getPositionsAroundCircle(numberOfPositions, width)
      var currentPosition = 0
      var everyX = Math.floor(totalHalfBeats / numberOfPositions)
      for (var i = 0; i < totalHalfBeats; i++) {
        var position = positions[currentPosition]
        if (i % everyX === 0) {
          cubes[i] = createCube(position[0], position[1], color)
          currentPosition++
        }
      }
      return cubes
    }(),
    isThereSomethingAtPosition: function isThereSomethingAtPosition (position) {
      return this.cubes[position]},
    sound: new Audio('sounds/' + soundName + '.wav')
  }
}
