/* global THREE */
/* global initialize */

var scene = initialize()

function createCube () {
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  var material = new THREE.MeshNormalMaterial()
  var mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = 45 * (Math.PI / 180)
  mesh.rotation.y = 45 * (Math.PI / 180)
  return mesh
}

var cube = createCube()
scene.add(cube)
