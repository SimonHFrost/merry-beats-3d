/* global THREE */
/* global Please */

var randomColor = Please.make_color()[0]

var MerryColors = {
  ACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(0xFFFFFF)}),
  INACTIVE_COLOR: new THREE.MeshLambertMaterial({color: randomColor }),
  HIGHLIGHTED_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(0x666666)})
}
