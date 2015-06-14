/* global Audio */
/* global THREE */
/* global merryColors */
/* global merryMaths */

var merryCubeCreator = {
  SIZE: 0.25,
  createCube: function createCube (x, z) {
    var geometry = new THREE.BoxGeometry(this.SIZE, this.SIZE, this.SIZE)
    var material = merryColors.INACTIVE_COLOR
    var mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = x
    mesh.position.y = 0
    mesh.position.z = z

    mesh.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(mesh)
    return mesh
  },

  createRingOfCubes: function createRingOfCubes (totalHalfBeats, numberOfPositions, width, soundName) {
    var me = this
    return {
      cubes: (function makeCubes () {
        var cubes = []
        var positions = merryMaths.getPositionsAroundCircle(numberOfPositions, width)
        var currentPosition = 0
        var everyX = Math.floor(totalHalfBeats / numberOfPositions)
        for (var i = 0; i < totalHalfBeats; i++) {
          var position = positions[currentPosition]
          if (i % everyX === 0) {
            cubes[i] = me.createCube(position[0], position[1])
            currentPosition++
          }
        }
        return cubes
      })(),
      isThereSomethingAtPosition: function isThereSomethingAtPosition (position) {
        return this.cubes[position]
      },
      sound: new Audio('sounds/' + soundName + '.wav')
    }
  }
}
