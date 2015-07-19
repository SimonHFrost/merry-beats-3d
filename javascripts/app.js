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

  var merryInitializer = new MerryInitializer(merryColors)

  var merryMaths = new MerryMaths()


  // FIXME: Rename collection
  var collection = merryInitializer.initialize()

  var scene = collection.scene
  var camera = collection.camera

  var merryCubeCreator = new MerryCubeCreator(scene, merryColors)

  var ringConfig = this._prepareRingConfig()
  var rings = this._createRingsFromConfig(scene, merryColors, ringConfig, merryMaths, merryColors, merryCubeCreator)

  var merryScheduler = new MerryScheduler(merryColors)
  merryScheduler.watchCollection(rings, this.TOTAL_HALF_BEATS)
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

App.prototype._createRingsFromConfig = function (scene, merryColors, ringConfig, merryMaths, merryColors, merryCubeCreator) {
  var me = this
  var rings = []

  ringConfig.forEach(function (ringConfig) {
    if (me.TOTAL_HALF_BEATS % ringConfig.numberOfPositions !== 0) {
      console.warn('numberOfPositions must be a factor of TOTAL_HALF_BEATS')
    }

    // FIXME: Remove the initialize method
    rings.push(
      new MerryRing(merryCubeCreator, me.TOTAL_HALF_BEATS, ringConfig, merryColors)
    )
  })
  return rings
}

var app = new App()
app.start()
