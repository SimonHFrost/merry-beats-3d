var MerryInitializer = window.MerryInitializer
var MerryColors = window.MerryColors
var MerryMaths = window.MerryMaths
var MerryCubeCreator = window.MerryCubeCreator
var MerryScheduler = window.MerryScheduler
var MerryClickHandler = window.MerryClickHandler
var MerryRing = window.MerryRing

function App () {}

App.prototype.TOTAL_HALF_BEATS = 128

App.prototype.start = function () {
  var merryColors = new MerryColors()
  var merryMaths = new MerryMaths()

  var merryInitializer = new MerryInitializer(merryColors)
  var output = merryInitializer.initialize()
  var scene = output.scene
  var camera = output.camera

  var merryCubeCreator = new MerryCubeCreator(scene, merryColors)

  var ringConfig = this._prepareRingConfig()
  var rings = this._createRingsFromConfig(merryColors, ringConfig, merryMaths, merryColors, merryCubeCreator)

  var merryScheduler = new MerryScheduler(merryColors, this.TOTAL_HALF_BEATS)
  merryScheduler.watchCollection(rings)
  var merryClickHandler = new MerryClickHandler(scene, camera, merryInitializer, merryColors)
}

App.prototype._prepareRingConfig = function () {

  var ringConfig = [
    { numberOfPositions: 128, width: 6, soundName: 'closedHihat' },
    { numberOfPositions: 32, width: 5, soundName: 'closedHihat' },
    { numberOfPositions: 64, width: 4, soundName: 'snare' },
    { numberOfPositions: 32, width: 3, soundName: 'clap' },
    { numberOfPositions: 16, width: 2, soundName: 'kick' }
  ]

  return ringConfig
}

// FIXME: Reduce params
App.prototype._createRingsFromConfig = function (merryColors, ringConfig, merryMaths, merryColors, merryCubeCreator) {
  var me = this
  var rings = []

  ringConfig.forEach(function (ringConfig) {
    if (me.TOTAL_HALF_BEATS % ringConfig.numberOfPositions !== 0) {
      console.warn('numberOfPositions must be a factor of TOTAL_HALF_BEATS')
    }

    rings.push(
      new MerryRing(merryCubeCreator, merryColors, me.TOTAL_HALF_BEATS, ringConfig)
    )
  })
  return rings
}

var app = new App()
app.start()
