/* global THREE */
/* global Please */

function generateColorScheme () {
  var randomColor = Please.make_color({value: '0.95'})[0]
  var scheme = Please.make_scheme(Please.HEX_to_HSV(randomColor), { scheme_type: 'complementary' })

  primaryColor = scheme[0]
  secondaryColor = scheme[1]
  highlightColor = 'white'
}

function setHtmlColors () {
  document.body.style.color = primaryColor
  document.body.style.backgroundColor = secondaryColor
}

function setButtonColors () {
  document.getElementsByTagName('button')[0].style.backgroundColor = primaryColor
  document.getElementsByTagName('button')[1].style.backgroundColor = primaryColor
  document.getElementsByTagName('button')[2].style.backgroundColor = primaryColor

  document.getElementsByTagName('button')[0].style.color = secondaryColor
  document.getElementsByTagName('button')[1].style.color = secondaryColor
  document.getElementsByTagName('button')[2].style.color = secondaryColor
}

generateColorScheme()
setHtmlColors()
setButtonColors()

var MerryColors = {
  ACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(highlightColor)}),
  INACTIVE_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(primaryColor)}),
  HIGHLIGHTED_COLOR: new THREE.MeshLambertMaterial({color: new THREE.Color(secondaryColor)})
}
