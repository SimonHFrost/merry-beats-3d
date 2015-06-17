/* global merryInitializer */
/* global merryCubeCreator */
/* global merryScheduler */
/* global merryClickHandler */

var collection = merryInitializer.initialize()
var scene = collection['scene']
var camera = collection['camera']

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
    merryCubeCreator.createRingOfCubes(
      totalHalfBeats,
      ringConfig.numberOfPositions,
      ringConfig.width,
      ringConfig.soundName)
  )
})

merryScheduler.watchCollection(rings)
merryClickHandler.watchClicks(scene, camera)
