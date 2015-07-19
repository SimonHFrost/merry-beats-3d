var Audio = window.Audio
var THREE = window.THREE
var MerryMaths = window.MerryMaths

function MerryCubeCreator (scene, merryColors) {
  this.scene = scene
  this.merryColors = merryColors
}

MerryCubeCreator.prototype.SIZE = 0.25

MerryCubeCreator.prototype.createCube = function (createFunction, x, z, rotation) {
  var geometry = createFunction()
  var material = this.merryColors.INACTIVE_COLOR
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

// FIXME: Reduce params
MerryCubeCreator.prototype.createRingOfCubes = function (totalHalfBeats, ringConfig) {
  var me = this

  // FIXME: Don't use object here
  return {
    cubes: (function makeCubes () {
      var cubes = []
      var merryMaths = new MerryMaths()
      var positions = merryMaths.getPositionsAroundCircle(ringConfig.numberOfPositions, ringConfig.width)
      var currentPosition = 0
      var everyX = Math.floor(totalHalfBeats / ringConfig.numberOfPositions)
      for (var i = 0; i < totalHalfBeats; i++) {
        var position = positions[currentPosition]
        if (i % everyX === 0) {
          cubes[i] = me.createCube(ringConfig.createFunction, position[0], position[1], ringConfig.rotation)
          currentPosition++
        }
      }
      return cubes
    })(),
    isThereSomethingAtPosition: function isThereSomethingAtPosition (position) {
      return this.cubes[position]
    },
    sound: new Audio('sounds/' + ringConfig.soundName + '.wav')
  }
}
