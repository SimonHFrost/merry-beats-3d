var Audio = window.Audio
var MerryMaths = window.MerryMaths

function MerryRing (merryCubeCreator, merryColors, totalHalfBeats, ringConfig) {
  this.merryMaths = new MerryMaths()

  this.merryCubeCreator = merryCubeCreator
  this.totalHalfBeats = totalHalfBeats
  this.ringConfig = ringConfig
  this.merryColors = merryColors

  this.initialize()
}

MerryRing.prototype._isThereCubeOnBeat = function (index) {
  return index % this._doSomething(index) !== 0
}

MerryRing.prototype._doSomething = function (index) {
  return Math.floor(this.totalHalfBeats / this.ringConfig.numberOfPositions)
}

MerryRing.prototype._playSound = function () {
  this.sound.play()
}

MerryRing.prototype.initialize = function () {
  this.cubes = []
  var positions = this.merryMaths.getPositionsAroundCircle(this.ringConfig.numberOfPositions, this.ringConfig.width)
  var currentPosition = 0
  var everyX = this._doSomething()
  for (var i = 0; i < this.totalHalfBeats; i++) {
    var position = positions[currentPosition]
    if (i % everyX === 0) {
      this.cubes[i] = this.merryCubeCreator.createSquare(position[0], position[1])
      currentPosition++
    }
  }

  // FIXME: Use html5 audio source?
  this.sound = new Audio('sounds/' + this.ringConfig.soundName + '.wav')
}

MerryRing.prototype.toggleLocation = function (index) {
  var me = this

  if (this._isThereCubeOnBeat(index)) {
    return
  }

  var previousMaterial = this.cubes[index].material
  if (this.cubes[index].playClip) {
    this._playSound()
  }

  this.cubes[index].material = this.merryColors.ACTIVE_COLOR

  // FIXME: Use something better than a timeout
  setTimeout(function () {
    me.cubes[index].material = previousMaterial
  }, 100) // FIXME: Using STEP_DURATION on the module doesn't work for some reason
}
