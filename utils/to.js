let lastTime = 0
let vendors = ['webkit', 'moz']
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
}

if (!window.requestAnimationFrame){
  window.requestAnimationFrame = function (callback) {
    let currTime = new Date().getTime()
    let timeToCall = Math.max(0, 16 - (currTime - lastTime))
    let id = window.setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}
if (!window.cancelAnimationFrame){
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id)
  }
}

let To = function (el, property, value, time, ease, onEnd, onChange ) {
  let current = el[property]
  let dv = value - current
  let beginTime = new Date()
  let self = this
  let currentEase = ease || function (a) {
    return a
  }
  this.tickID = null
  let toTick = function () {
    let dt = new Date() - beginTime
    if (dt >= time) {
      el[property] = value
      onChange && onChange(value)
      onEnd && onEnd(value)
      cancelAnimationFrame(self.tickID)
      self.toTick = null
      return
    }
    el[property] = dv * currentEase(dt / time) + current
    self.tickID=requestAnimationFrame(toTick)
    onChange && onChange(el[property])
  };
  toTick()
  To.List.push(this)
}

To.List = []

To.stopAll = function () {
  for (let i= 0, len=To.List.length; i < len; i++){
    cancelAnimationFrame(To.List[i].tickID)
  }
  To.List.length = 0
}

To.stop = function (to) {
  cancelAnimationFrame(to.tickID)
}
