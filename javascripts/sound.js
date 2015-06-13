/* global Audio */
document.addEventListener('mousedown', mouseDown, false)
function mouseDown (event) {
  var audio = new Audio('sounds/snare.wav')
  audio.play()
}
