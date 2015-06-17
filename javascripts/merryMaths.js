var MerryMaths = {
  getPositionsAroundCircle: function getPositionsAroundCircle (numberOfPositions, width) {
    var circle = Math.PI * 2

    var everyXDegrees = circle / numberOfPositions

    var result = []
    for (var i = 0; i < numberOfPositions; i++) {
      var currentDegrees = i * everyXDegrees

      var x = Math.cos(currentDegrees) * width
      var z = Math.sin(currentDegrees) * width

      result.push([x, z])
    }

    return result
  }
}
