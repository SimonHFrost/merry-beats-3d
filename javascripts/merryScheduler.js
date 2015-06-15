/* global merryColors */

var merryScheduler = {
  STEP_DURATION: 250,

  checkAllRings: function checkAllRings (rings, number) {
    console.log("I'm at number " + number)

    rings.forEach(function (ring) {
      if (ring.isThereSomethingAtPosition(number)) {
        var previousMaterial = ring.cubes[number].material
        if (ring.cubes[number].playClip) {
          ring.sound.play()
        }
        ring.cubes[number].material = merryColors.ACTIVE_COLOR

        // SO SO HACKY
        setTimeout(function () {
          ring.cubes[number].material = previousMaterial
        }, 250) // It doesn't like using the STEP_DURATION on the module for some reason
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
