var THREE = window.THREE
var Audio = window.Audio

function MerryShapeCreator (scene, merryColors) {
  this.scene = scene
  this.merryColors = merryColors
}

MerryShapeCreator.prototype.SIZE = 0.25

MerryShapeCreator.prototype.createShape = function (x, z, ringConfig) {
  if (ringConfig.shape === 'square') {
    return this._createMesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), x, z, ringConfig.soundName)
  } else if (ringConfig.shape === 'rectangle') {
    return this._createMesh(new THREE.BoxGeometry(0.25, 0.25, 0.75), x, z, ringConfig.soundName)
  } else if (ringConfig.shape === 'slanted') {
    var mesh = this._createMesh(new THREE.BoxGeometry(0.25, 0.25, 0.75), x, z, ringConfig.soundName)
    mesh.rotation.y += 40 * (Math.PI / 180)
    return mesh
  } else {
    console.warn('Can not create unknown shape: ' + ringConfig.shape)
  }
}

MerryShapeCreator.prototype._createMesh = function (geometry, x, z, soundName) {
  var material = this.merryColors.INACTIVE_COLOR
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = z

  // FIXME: The current incorrect up vector flips the lookat function after 180 degrees
  //        See https://github.com/mrdoob/three.js/issues/1460
  mesh.up.set(0, 1, 0)
  mesh.lookAt(new THREE.Vector3(0, 0, 0))

  console.log(mesh.rotation.y * 180 / Math.PI)

  // FIXME: Use html5 audio source?
  mesh.sound = new Audio('sounds/' + soundName + '.wav')

  this.scene.add(mesh)
  return mesh
}
