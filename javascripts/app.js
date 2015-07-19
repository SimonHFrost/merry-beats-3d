/* global THREE */
/* global MerryInitializer */
/* global MerryCubeCreator */
/* global MerryScheduler */
/* global MerryClickHandler */
/* global MerryColors */

// FIXME: Remove globals from top of files

// FIXME: Move totalHalfBeats into app prototype
var totalHalfBeats = 128

function App () {}

App.prototype.start = function () {
  var merryColors = new MerryColors()

  var merryInitializer = new MerryInitializer(merryColors)
  var collection = merryInitializer.initialize()

  var scene = collection['scene']
  var camera = collection['camera']

  var ringConfig = this._prepareRingConfig()
  var rings = this._createRingsFromConfig(scene, merryColors, ringConfig)

  var merryScheduler = new MerryScheduler(merryColors)
  merryScheduler.watchCollection(rings)
  var merryClickHandler = new MerryClickHandler(scene, camera, merryInitializer, merryColors)
}

App.prototype._prepareRingConfig = function () {
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

  return ringConfig
}

App.prototype._createRingsFromConfig = function (scene, merryColors, ringConfig) {
  var merryCubeCreator = new MerryCubeCreator(scene, merryColors)

  var rings = []
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
  return rings
}

var app = new App()
app.start()
