/* global Audio */
/* global THREE */
/* global MerryColors */
/* global MerryMaths */

var MerryCubeCreator = {
  scene: '',
  SIZE: 0.25,

  createCube: function createCube (createFunction, x, z, rotation) {
    var geometry = createFunction()
    var material = MerryColors.INACTIVE_COLOR
    var mesh = new THREE.Mesh(geometry, material)

    mesh.position.x = x
    mesh.position.y = 0
    mesh.position.z = z

    mesh.lookAt(new THREE.Vector3(0, 0, 0))
    if (!rotation) {
      rotation = 0
    }

    if(!rotation) {
      console.log(mesh.rotation.y)
    }

    mesh.rotation.y += rotation

    this.scene.add(mesh)
    return mesh
  },

  createRingOfCubes: function createRingOfCubes (scene, totalHalfBeats, numberOfPositions, width, soundName, createFunction, rotation) {
    var me = this
    this.scene = scene
    return {
      cubes: (function makeCubes () {
        var cubes = []
        var positions = MerryMaths.getPositionsAroundCircle(numberOfPositions, width)
        var currentPosition = 0
        var everyX = Math.floor(totalHalfBeats / numberOfPositions)
        for (var i = 0; i < totalHalfBeats; i++) {
          var position = positions[currentPosition]
          if (i % everyX === 0) {
            cubes[i] = me.createCube(createFunction, position[0], position[1], rotation)
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
