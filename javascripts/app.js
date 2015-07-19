var MerryInitializer = window.MerryInitializer
var MerryCubeCreator = window.MerryCubeCreator
var MerryScheduler = window.MerryScheduler
var MerryClickHandler = window.MerryClickHandler
var MerryColors = window.MerryColors
var THREE = window.THREE

function App () {}

App.prototype.TOTAL_HALF_BEATS = 128

App.prototype.start = function () {
  var merryColors = new MerryColors()

  var merryInitializer = new MerryInitializer(merryColors)
  var collection = merryInitializer.initialize()

  var scene = collection.scene
  var camera = collection.camera

  var ringConfig = this._prepareRingConfig()
  var rings = this._createRingsFromConfig(scene, merryColors, ringConfig)

  var merryScheduler = new MerryScheduler(merryColors)
  merryScheduler.watchCollection(rings, this.TOTAL_HALF_BEATS)
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
  var me = this
  var merryCubeCreator = new MerryCubeCreator(scene, merryColors)
  var rings = []

  ringConfig.forEach(function (ringConfig) {
    if (me.TOTAL_HALF_BEATS % ringConfig.numberOfPositions !== 0) {
      console.warn('numberOfPositions must be a factor of TOTAL_HALF_BEATS')
    }

    rings.push(
      merryCubeCreator.createRingOfCubes(
        me.TOTAL_HALF_BEATS,
        ringConfig
      )
    )
  })
  return rings
}

var app = new App()
app.start()
