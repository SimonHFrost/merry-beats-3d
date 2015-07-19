var THREE = window.THREE
var Please = window.Please

function MerryColors () {
  var randomColor = Please.make_color({value: '0.95'})[0]
  var scheme = Please.make_scheme(Please.HEX_to_HSV(randomColor), { scheme_type: 'complementary' })

  this.primaryColor = scheme[0]
  this.secondaryColor = scheme[1]
  this.highlightColor = 'white'

  this.setHtmlColors(this.primaryColor, this.secondaryColor)
  this.setButtonColors(this.primaryColor, this.secondaryColor)
  this.setMaterials(this.primaryColor, this.secondaryColor, this.highlightColor)
}

MerryColors.prototype.setHtmlColors = function (primaryColor, secondaryColor) {
  document.body.style.color = primaryColor
  document.body.style.backgroundColor = secondaryColor
}

MerryColors.prototype.setButtonColors = function (primaryColor, secondaryColor) {
  document.getElementsByTagName('button')[0].style.backgroundColor = primaryColor
  document.getElementsByTagName('button')[1].style.backgroundColor = primaryColor
  document.getElementsByTagName('button')[2].style.backgroundColor = primaryColor

  document.getElementsByTagName('button')[0].style.color = secondaryColor
  document.getElementsByTagName('button')[1].style.color = secondaryColor
  document.getElementsByTagName('button')[2].style.color = secondaryColor
}

MerryColors.prototype.setMaterials = function (primaryColor, secondaryColor, highlightColor) {
  this.ACTIVE_COLOR = new THREE.MeshLambertMaterial({color: new THREE.Color(highlightColor)})
  this.INACTIVE_COLOR = new THREE.MeshLambertMaterial({color: new THREE.Color(primaryColor)})
  this.HIGHLIGHTED_COLOR = new THREE.MeshLambertMaterial({color: new THREE.Color(secondaryColor)})
}
