function MerryScheduler (merryColors, totalHalfBeats, rings) {
  this.merryColors = merryColors
  this.totalHalfBeats = totalHalfBeats
  this.rings = rings
}

MerryScheduler.prototype.STEP_DURATION = 100
MerryScheduler.prototype.intervalId = ''

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

MerryScheduler.prototype.resetColors = function () {
  var me = this

  this.rings.forEach(function (ring) {
    ring.cubes.forEach(function (cube) {
      cube.material = me.merryColors.INACTIVE_COLOR
    })
  })
}

MerryScheduler.prototype.toggleScheduling = function () {
  if (this.intervalId) {
    window.clearInterval(this.intervalId)
    this.intervalId = ''
    document.getElementById('pause').innerHTML = 'Resume'
  } else {
    this.intervalId = this._watchCollection()
    document.getElementById('pause').innerHTML = 'Pause'
  }
}

// FIXME: rename function
MerryScheduler.prototype._watchCollection = function () {
  var me = this
  var count = 0
  return setInterval(function () {
    me._checkAllRings(me.rings, count++ % me.totalHalfBeats)
  }, me.STEP_DURATION)
}

MerryScheduler.prototype._checkAllRings = function (rings, index) {
  rings.forEach(function (ring) {
    ring.toggleAtIndex(index)
  })
}

