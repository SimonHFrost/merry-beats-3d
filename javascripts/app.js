/* global THREE */
/* global MerryInitializer */
/* global MerryCubeCreator */
/* global MerryScheduler */
/* global MerryClickHandler */

var merryInitializer = new MerryInitializer()
var collection = merryInitializer.initialize()

var scene = collection['scene']
var camera = collection['camera']

var cube = function () {
  return new THREE.BoxGeometry(0.25, 0.25, 0.25)
}

var rectangle = function () {
  return new THREE.BoxGeometry(0.25, 0.25, 0.75)
}

var ringConfig = [
  { numberOfPositions: 128, width: 6, soundName: 'closedHihat', createFunction: rectangle },
  { numberOfPositions: 32, width: 5, soundName: 'closedHihat', createFunction: rectangle, rotation: Math.PI / 4 },
  { numberOfPositions: 64, width: 4, soundName: 'snare', createFunction: cube },
  { numberOfPositions: 32, width: 3, soundName: 'clap', createFunction: rectangle },
  { numberOfPositions: 16, width: 2, soundName: 'kick', createFunction: cube }
]

var rings = []
var totalHalfBeats = 128

var merryCubeCreator = new MerryCubeCreator(scene)

ringConfig.forEach(function (ringConfig) {
  if (totalHalfBeats % ringConfig.numberOfPositions !== 0) {
    console.warn('numberOfPositions must be a factor of totalHalfBeats')
  }

  rings.push(
    merryCubeCreator.createRingOfCubes(
      totalHalfBeats,
      ringConfig.numberOfPositions,
      ringConfig.width,
      ringConfig.soundName,
      ringConfig.createFunction,
      ringConfig.rotation)
  )
})

var merryScheduler = new MerryScheduler()
merryScheduler.watchCollection(rings)
var merryClickHandler = new MerryClickHandler(scene, camera, merryInitializer)
