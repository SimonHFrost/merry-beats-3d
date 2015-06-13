function getPositionsAroundCircle (numberOfPositions, width) {
  var circle = Math.PI * 2

  var everyXDegrees = circle / numberOfPositions

  var result = []
  for (var i = 0; i < numberOfPositions; i++) {
    var currentDegrees = i * everyXDegrees

    var x = Math.cos(currentDegrees) * width
    var z = Math.sin(currentDegrees) * width

    result.push([x, z])
    console.log(currentDegrees, x, z)
  }

  return result
}

console.log('2 * PI is ', Math.PI * 2)
