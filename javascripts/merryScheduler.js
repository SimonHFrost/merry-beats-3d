function MerryScheduler (merryColors, totalHalfBeats) {
  this.merryColors = merryColors
  this.totalHalfBeats = totalHalfBeats
}

MerryScheduler.prototype.STEP_DURATION = 100

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
