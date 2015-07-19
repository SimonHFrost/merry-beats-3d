var THREE = window.THREE

function MerryCubeCreator (scene, merryColors) {
  this.scene = scene
  this.merryColors = merryColors
}

MerryCubeCreator.prototype.SIZE = 0.25

MerryCubeCreator.prototype._createCube = function (geometry, x, z) {
  var material = this.merryColors.INACTIVE_COLOR
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = x
  mesh.position.y = 0
  mesh.position.z = z

  mesh.lookAt(new THREE.Vector3(0, 0, 0))

  this.scene.add(mesh)
  return mesh
}

MerryCubeCreator.prototype.createSquare = function (x, z) {
  return this._createCube(new THREE.BoxGeometry(0.25, 0.25, 0.25), x, z)
}

MerryCubeCreator.prototype.createRectangle = function (x, z) {
  return this._createCube(new THREE.BoxGeometry(0.25, 0.25, 0.75), x, z)
}
