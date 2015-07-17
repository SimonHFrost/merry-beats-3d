/* global Audio */
/* global THREE */
/* global MerryColors */
/* global MerryMaths */

function MerryCubeCreator (scene) {
  this.scene = scene
}

MerryCubeCreator.prototype.SIZE = 0.25

MerryCubeCreator.prototype.createCube = function (createFunction, x, z, rotation) {
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

  mesh.rotation.y += rotation

  this.scene.add(mesh)
  return mesh
}

MerryCubeCreator.prototype.createRingOfCubes = function (totalHalfBeats, numberOfPositions, width, soundName, createFunction, rotation) {
  var me = this
  // FIXME: Don't use object here
  return {
    cubes: (function makeCubes () {
      var cubes = []
      var merryMaths = new MerryMaths()
      var positions = merryMaths.getPositionsAroundCircle(numberOfPositions, width)
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
