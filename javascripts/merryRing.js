var MerryMaths = window.MerryMaths

function MerryRing (merryShapeCreator, merryColors, totalHalfBeats, ringConfig) {
  this.merryMaths = new MerryMaths()

  this.merryShapeCreator = merryShapeCreator
  this.totalHalfBeats = totalHalfBeats
  this.ringConfig = ringConfig
  this.merryColors = merryColors

  this._initialize()
}

MerryRing.prototype.toggleAtIndex = function (index) {
  var me = this

  if (this._isThereCubeOnBeat(index)) {
    return
  }

  var previousMaterial = this.cubes[index].material
  if (this.cubes[index].playClip) {
    this.cubes[index].sound.play()
  }

  this.cubes[index].material = this.merryColors.ACTIVE_COLOR

  // FIXME: Use something better than a timeout
  setTimeout(function () {
    me.cubes[index].material = previousMaterial
  }, 100) // FIXME: Using STEP_DURATION on the module doesn't work for some reason
}

MerryRing.prototype._initialize = function () {
  this.cubes = []
  var positions = this.merryMaths.getPositionsAroundCircle(this.ringConfig.numberOfPositions, this.ringConfig.radius)
  var currentPosition = 0
  var everyX = this._beatInterval()
  for (var i = 0; i < this.totalHalfBeats; i++) {
    var position = positions[currentPosition]
    if (i % everyX === 0) {
      this.cubes[i] = this.merryShapeCreator.createShape(position[0], position[1], this.ringConfig)
      currentPosition++
    }
  }
}

MerryRing.prototype._isThereCubeOnBeat = function (index) {
  return index % this._beatInterval() !== 0
}

MerryRing.prototype._beatInterval = function () {
  return Math.floor(this.totalHalfBeats / this.ringConfig.numberOfPositions)
}
