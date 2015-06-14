/* global merryColors */

var merryScheduler = {
  STEP_DURATION: 250,

  checkAllRings: function checkAllRings (rings, number) {
    console.log("I'm at number " + number)

    rings.forEach(function (ring) {
      if (ring.isThereSomethingAtPosition(number)) {
        ring.sound.play()
        ring.cubes[number].material = merryColors.ACTIVE_COLOR

        // SO SO HACKY
        setTimeout(function () {
          ring.cubes[number].material = merryColors.INACTIVE_COLOR
        }, 250) // It doesn't like using the STEP_DURATION on the module for some reason
      }
    })
  },

  watchCollection: function watchCollection (rings) {
    var me = this
    var count = 0
    setInterval(function () {
      me.checkAllRings(rings, count++)
    }, me.STEP_DURATION)
  }
}
