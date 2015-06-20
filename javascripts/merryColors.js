/* global THREE */
/* global Please */

var randomColor = Please.make_color()[0]
var scheme = Please.make_scheme(Please.HEX_to_HSV(randomColor), { scheme_type: 'triadic' })

var first = scheme[0]
var second = scheme[1]
var third = scheme[2]

document.body.style.backgroundColor = third

var MerryColors = {
  ACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(second)}),
  INACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(first)}),
  HIGHLIGHTED_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(third)})
}
