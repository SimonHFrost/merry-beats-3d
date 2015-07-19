function MerryScheduler (merryColors) {
  this.merryColors = merryColors
}

MerryScheduler.prototype.STEP_DURATION = 100

MerryScheduler.prototype.checkAllRings = function (rings, number) {
  var me = this
  rings.forEach(function (ring) {
    if (ring.isThereSomethingAtPosition(number)) {
      var previousMaterial = ring.cubes[number].material
      if (ring.cubes[number].playClip) {
        ring.sound.play()
      }
      ring.cubes[number].material = me.merryColors.ACTIVE_COLOR

      // FIXME: Use something better than a timeout
      setTimeout(function () {
        ring.cubes[number].material = previousMaterial
      }, 100) // Using STEP_DURATION on the module doesn't work for some reason
    }
  })
}

MerryScheduler.prototype.watchCollection = function (rings) {
  var me = this
  var count = 0
  setInterval(function () {
    // FIXME: Don't use global var totalHalfBeats
    me.checkAllRings(rings, count++ % totalHalfBeats)
  }, me.STEP_DURATION)
}
