function MerryScheduler (merryColors, totalHalfBeats, rings) {
  this.merryColors = merryColors
  this.totalHalfBeats = totalHalfBeats
  this.rings = rings
}

MerryScheduler.prototype.STEP_DURATION = 100

MerryScheduler.prototype.resetAllCubes = function () {
  var me = this

  // FIXME: Maybe abstract this into the rings object
  this.rings.forEach(function (ring) {
    ring.cubes.forEach(function (cube) {
      cube.material = me.merryColors.INACTIVE_COLOR
      cube.playClip = false
    })
  })
}

// FIXME: use rings from constructor
MerryScheduler.prototype.watchCollection = function (rings) {
  var me = this
  var count = 0
  setInterval(function () {
    me._checkAllRings(rings, count++ % me.totalHalfBeats)
  }, me.STEP_DURATION)
}

MerryScheduler.prototype._checkAllRings = function (rings, index) {
  rings.forEach(function (ring) {
    ring.toggleAtIndex(index)
  })
}
