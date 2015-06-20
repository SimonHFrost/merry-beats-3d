/* global THREE */
/* global Please */

var randomColor = Please.make_color({value: '0.95'})[0]
var scheme = Please.make_scheme(Please.HEX_to_HSV(randomColor), { scheme_type: 'triadic' })

var first = scheme[0]
var second = scheme[1]
var third = scheme[2]

document.body.style.backgroundColor = third

document.getElementsByTagName('button')[0].style.backgroundColor = first
document.getElementsByTagName('button')[0].style.color = third
document.getElementsByTagName('button')[1].style.backgroundColor = first
document.getElementsByTagName('button')[1].style.color = third
document.getElementsByTagName('button')[2].style.backgroundColor = first
document.getElementsByTagName('button')[2].style.color = third

document.getElementById('info').style.color = first

var MerryColors = {
  ACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(second)}),
  INACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(first)}),
  HIGHLIGHTED_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(third)})
}
