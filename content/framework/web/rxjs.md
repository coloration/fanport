
``` js
const Rx = require('rxjs')

const Obs = Rx.Observable
const eventTypes = {
  mousemove: 'mousemove',
  mouseup: 'mouseup',
  mousedown: 'mousedown'
}

const documentMouseDownStream = Rx.fromEvent(document, eventTypes.mousedown)
const documentMouseMoveStream = Rx.fromEvent(document, eventTypes.mousemove)
const documentMouseUpStream = Rx.fromEvent(document, eventTypes.mouseup)

const dragStartObs = function (dom) {
  return Obs.create(function (observer) {
    var startEvt = null
    var on = false

    Rx.fromEvent(dom, eventTypes.mousedown).subscribe(function(evt) {
      startEvt = evt
    })

    documentMouseMoveStream.subscribe(function (evt) {
      if (!startEvt || on) return
      if (
        Math.abs(evt.pageY - startEvt.pageY) > 20 ||
        Math.abs(evt.pageX - startEvt.pageX) > 20
      ) {
        on = true
        observer.next(startEvt)
      }
    })

    documentMouseUpStream.subscribe(function (evt) {
      startEvt = null
      on = false
    })
  })
}

const dragEndObs = function (dom, startStream) {
  return Obs.create(function (observer) {
    var startEvt = null
    
    startStream = startStream || dragStartObs(dom)

    startStream.subscribe(function (evt) {
      startEvt = evt
    })

    documentMouseUpStream.subscribe(function (evt) {
      if (!startEvt) return
      observer.next({ start: startEvt, end: evt })
      startEvt = null
    })
  })
}

const dragMovingObs = function (dom, startStream, endStream) {
  return Obs.create(function (observer) {
    var startEvt = null
    var lastEvt = null

    startStream = startStream || dragStartObs(dom)
    endStream = endStream || dragEndObs(dom, startStream)

    startStream.subscribe(function (evt) {
      lastEvt = startEvt = evt
    })

    documentMouseMoveStream.subscribe(function (evt) {
      if (!startEvt) return
      observer.next({ start: startEvt, move: evt, last: lastEvt })
      lastEvt = evt
    })

    endStream.subscribe(function () {
      lastEvt = startEvt = null
    })
  })
}


```