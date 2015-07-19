function MerryMaths () {}

MerryMaths.prototype.getPositionsAroundCircle = function (numberOfPositions, radius) {
  var circle = Math.PI * 2

  var everyXDegrees = circle / numberOfPositions

  var result = []
  for (var i = 0; i < numberOfPositions; i++) {
    var currentDegrees = i * everyXDegrees

    var x = Math.cos(currentDegrees) * radius
    var z = Math.sin(currentDegrees) * radius

    result.push([x, z])
  }

  return result
}
