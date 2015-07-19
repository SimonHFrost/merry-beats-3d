var THREE = window.THREE

function MerryShapeCreator (scene, merryColors) {
  this.scene = scene
  this.merryColors = merryColors
}

MerryShapeCreator.prototype.SIZE = 0.25

MerryShapeCreator.prototype.createShape = function (x, z, shape) {
  if (shape === 'square') {
    return this._createMesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), x, z)
  } else if (shape === 'rectangle') {
    return this._createMesh(new THREE.BoxGeometry(0.25, 0.25, 0.75), x, z)
  } else if (shape === 'slanted') {
    var mesh = this._createMesh(new THREE.BoxGeometry(0.25, 0.25, 0.75), x, z)
    mesh.rotation.y += 10
    return mesh
  } else {
    console.warn('Unknown shape: ' + shape)
  }
}

MerryShapeCreator.prototype._createMesh = function (geometry, x, z) {
  var material = this.merryColors.INACTIVE_COLOR
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = z

  mesh.lookAt(new THREE.Vector3(0, 0, 0))

  this.scene.add(mesh)
  return mesh
}
