/* global merryInitializer */
/* global merryCubeCreator */
/* global merryAudio */

var scene = merryInitializer.initialize()

merryCubeCreator.createCube(0, 0)

var ringConfig = [
  { numberOfPositions: 128, width: 8, soundName: 'closedHihat' },
  { numberOfPositions: 64, width: 6, soundName: 'snare' },
  { numberOfPositions: 32, width: 4, soundName: 'clap' },
  { numberOfPositions: 16, width: 2, soundName: 'kick' }
]

var rings = []
var totalHalfBeats = 128

ringConfig.forEach(function (ringConfig) {
  if (totalHalfBeats % ringConfig.numberOfPositions !== 0) {
    console.warn('numberOfPositions must be a factor of totalHalfBeats')
  }

  rings.push(
    merryCubeCreator.createRingOfCubes(totalHalfBeats, ringConfig.numberOfPositions, ringConfig.width, ringConfig.soundName)
  )
})

merryAudio.watchCollection(rings)
