var MerryInitializer = window.MerryInitializer
var MerryColors = window.MerryColors
var MerryMaths = window.MerryMaths
var MerryShapeCreator = window.MerryShapeCreator
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
  var renderer = output.renderer

  var merryShapeCreator = new MerryShapeCreator(scene, merryColors)

  var allRingConfig = this._prepareRingConfig()
  var rings = this._createRingsFromConfig(merryColors, merryMaths, merryShapeCreator, allRingConfig)

  var merryScheduler = new MerryScheduler(merryColors, this.TOTAL_HALF_BEATS, rings)
  merryScheduler.toggleScheduling()
  var merryClickHandler = new MerryClickHandler(scene, camera, renderer, merryInitializer, merryColors, merryScheduler)
}

App.prototype._prepareRingConfig = function () {
  return [
    { numberOfPositions: 128, radius: 6, soundName: 'closedHihat', shape: 'rectangle' },
    { numberOfPositions: 32, radius: 5, soundName: 'closedHihat', shape: 'slanted' },
    { numberOfPositions: 64, radius: 4, soundName: 'snare', shape: 'square' },
    { numberOfPositions: 32, radius: 3, soundName: 'clap', shape: 'square' },
    { numberOfPositions: 16, radius: 2, soundName: 'kick', shape: 'rectangle' }
  ]
}

App.prototype._createRingsFromConfig = function (merryColors, merryMaths, merryShapeCreator, allRingConfig) {
  var me = this
  var rings = []

  allRingConfig.forEach(function (ringConfig) {
    if (me.TOTAL_HALF_BEATS % ringConfig.numberOfPositions !== 0) {
      console.warn('numberOfPositions must be a factor of TOTAL_HALF_BEATS')
    }

    rings.push(
      new MerryRing(merryShapeCreator, merryColors, me.TOTAL_HALF_BEATS, ringConfig)
    )
  })
  return rings
}

var app = new App()
app.start()
