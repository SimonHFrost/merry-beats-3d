var STEP_DURATION = 250

function checkAllRings (rings, number) {
  console.log("I'm at number " + number)
  rings.forEach(function (ring) {
    if (ring.isThereSomethingAtPosition(number)) {
      ring.sound.play()
      ring.cubes[number].material = ACTIVE_COLOR

      // SO SO HACKY
      setTimeout(function () {
        ring.cubes[number].material = INACTIVE_COLOR
      }, STEP_DURATION)
    }
  })
}

function watchCollection (rings) {
  var count = 0
  setInterval(function () {
    checkAllRings(rings, count++ % totalHalfBeats)
  }, STEP_DURATION)
}
