function checkAllRings (rings, number) {
  console.log("I'm at number " + number)
  rings.forEach(function (ring) {
    if (ring.isThereSomethingAtPosition(number)) {
      ring.playSound()
      ring.cubes[number].material.color = 'black'
    }
  })
}

function watchCollection (rings) {
  var count = 0 % totalHalfBeats
  setInterval(function () {
    checkAllRings(rings, count++)
  }, 250)
}
