/* global THREE */
/* global initialize */

var scene = initialize()

var ringConfig = [
  { numberOfPositions: 128, width: 8, color: 'purple', soundName: 'closedHihat' },
  { numberOfPositions: 64, width: 6, color: 'blue', soundName: 'snare' },
  { numberOfPositions: 32, width: 4, color: 'green', soundName: 'clap' },
  { numberOfPositions: 16, width: 2, color: 'red', soundName: 'kick' }
]

ringConfig.forEach(function (ringConfig) {
  allRings.push(createRing(ringConfig.numberOfPositions, ringConfig.width, ringConfig.color, ringConfig.soundName))
})
