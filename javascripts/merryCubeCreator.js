var Audio = window.Audio
var THREE = window.THREE
var MerryMaths = window.MerryMaths

function MerryCubeCreator (scene, merryColors) {
  this.scene = scene
  this.merryColors = merryColors
}

MerryCubeCreator.prototype.SIZE = 0.25

MerryCubeCreator.prototype.createCube = function (geometry, x, z) {
  var material = this.merryColors.INACTIVE_COLOR
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = z

  mesh.lookAt(new THREE.Vector3(0, 0, 0))

  this.scene.add(mesh)
  return mesh
}

MerryCubeCreator.prototype.createSquare = function (x, z) {
  return this.createCube(new THREE.BoxGeometry(0.25, 0.25, 0.25), x, z)
}

MerryCubeCreator.prototype.createRectangle = function (x, z) {
  return this.createCube(new THREE.BoxGeometry(0.25, 0.25, 0.75), x, z)
}

MerryCubeCreator.prototype.createRingOfCubes = function (totalHalfBeats, ringConfig) {
  var me = this

  // FIXME: Improve this object structure
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
          cubes[i] = me.createSquare(position[0], position[1])
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
