function MerryScheduler (merryColors) {
  this.merryColors = merryColors
}

MerryScheduler.prototype.STEP_DURATION = 100

// FIXME: rename 'number' variables to 'index'
MerryScheduler.prototype.checkAllRings = function (rings, number) {
  rings.forEach(function (ring) {
    ring.toggleLocation(number)
  })
}

MerryScheduler.prototype.watchCollection = function (rings, totalHalfBeats) {
  var me = this
  var count = 0
  setInterval(function () {
    me.checkAllRings(rings, count++ % totalHalfBeats)
  }, me.STEP_DURATION)
}
