/* global THREE */
/* global Please */

var randomColor = Please.make_color()[0]

var scheme = Please.make_scheme(Please.HEX_to_HSV(randomColor), { scheme_type: 'complementary' })
var opposite = scheme[scheme.length - 1]

var MerryColors = {
  ACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(opposite)}),
  INACTIVE_COLOR: new THREE.MeshLambertMaterial({color: randomColor }),
  HIGHLIGHTED_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(0x666666)})
}
