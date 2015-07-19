var Audio = window.Audio
var MerryMaths = window.MerryMaths

function MerryRing (merryCubeCreator, totalHalfBeats, ringConfig, merryColors) {
  // FIXME: Is there a better way to DI?
  this.merryMaths = new MerryMaths()

  this.merryCubeCreator = merryCubeCreator
  this.totalHalfBeats = totalHalfBeats
  this.ringConfig = ringConfig
  this.merryColors = merryColors

  this.initialize()
}

// FIXME: Put totalHalfBeats somewhere more central
MerryRing.prototype.initialize = function () {
  this.cubes = []
  var positions = this.merryMaths.getPositionsAroundCircle(this.ringConfig.numberOfPositions, this.ringConfig.width)
  var currentPosition = 0
  var everyX = Math.floor(this.totalHalfBeats / this.ringConfig.numberOfPositions)
  for (var i = 0; i < this.totalHalfBeats; i++) {
    var position = positions[currentPosition]
    if (i % everyX === 0) {
      this.cubes[i] = this.merryCubeCreator.createSquare(position[0], position[1])
      currentPosition++
    }
  }

  this.sound = new Audio('sounds/' + this.ringConfig.soundName + '.wav')
}

MerryRing.prototype.playSound = function () {
  this.sound.play()
}

MerryRing.prototype.toggleLocation = function (index) {
  var me = this

  // FIXME: Can this logic be centralized?
  if (index % Math.floor(this.totalHalfBeats / this.ringConfig.numberOfPositions) !== 0) {
    return
  }

  var previousMaterial = this.cubes[index].material
  if (this.cubes[index].playClip) {
    this.playSound()
  }

  this.cubes[index].material = this.merryColors.ACTIVE_COLOR

  // FIXME: Use something better than a timeout
  setTimeout(function () {
    me.cubes[index].material = previousMaterial
  }, 100) // FIXME: Using STEP_DURATION on the module doesn't work for some reason
}
