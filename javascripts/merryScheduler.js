/* global MerryColors */

var MerryScheduler = {
  STEP_DURATION: 100,

  checkAllRings: function checkAllRings (rings, number) {
    rings.forEach(function (ring) {
      if (ring.isThereSomethingAtPosition(number)) {
        var previousMaterial = ring.cubes[number].material
        if (ring.cubes[number].playClip) {
          ring.sound.play()
        }
        ring.cubes[number].material = MerryColors.ACTIVE_COLOR

        // SO SO HACKY
        setTimeout(function () {
          ring.cubes[number].material = previousMaterial
        }, 100) // It doesn't like using the STEP_DURATION on the module for some reason
      }
    })
  },

  watchCollection: function watchCollection (rings) {
    var me = this
    var count = 0
    setInterval(function () {
      me.checkAllRings(rings, count++ % totalHalfBeats)
    }, me.STEP_DURATION)
  }
}
