function checkAllRings (rings, number) {
  console.log("I'm at number " + number)
  rings.forEach(function (ring) {
    if (ring.isThereSomethingAtPosition(number)) {
      ring.sound.play()
      ring.cubes[number].material.color = 'black'
    }
  })
}

function watchCollection (rings) {
  var count = 0
  setInterval(function () {
    checkAllRings(rings, count++ % totalHalfBeats)
  }, 250)
}
