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

  var allRingConfig = this._prepareRingConfig()
  var rings = this._createRingsFromConfig(merryColors, merryMaths, merryCubeCreator, allRingConfig)

  var merryScheduler = new MerryScheduler(merryColors, this.TOTAL_HALF_BEATS)
  merryScheduler.watchCollection(rings)
  var merryClickHandler = new MerryClickHandler(scene, camera, merryInitializer, merryColors)
}

App.prototype._prepareRingConfig = function () {
  return [
    { numberOfPositions: 128, radius: 6, soundName: 'closedHihat' },
    { numberOfPositions: 32, radius: 5, soundName: 'closedHihat' },
    { numberOfPositions: 64, radius: 4, soundName: 'snare' },
    { numberOfPositions: 32, radius: 3, soundName: 'clap' },
    { numberOfPositions: 16, radius: 2, soundName: 'kick' }
  ]
}

App.prototype._createRingsFromConfig = function (merryColors, merryMaths, merryCubeCreator, allRingConfig) {
  var me = this
  var rings = []

  allRingConfig.forEach(function (ringConfig) {
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
