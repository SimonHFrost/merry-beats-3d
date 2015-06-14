var allRings = []

var count = 0 % totalHalfBeats
setInterval(function () {
  checkAllRings(count++)
}, 250)

function checkAllRings (number) {
  console.log("I'm at number " + number)
  allRings.forEach(function (ring) {
    if (ring.isThereSomethingAtPosition(number)) {
      ring.playSound()
      ring.cubes[Math.floor(number * ring.cubes.length / totalHalfBeats)].material.color = 'black'
    }
  })
}
