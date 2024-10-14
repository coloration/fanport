---
title: 播放 RTSP
---


``` js
const express = require('express')
const app = express()


app.use(express.static('public'))


const store = {

}

function startProcess (address) {
  const child_process = require('child_process')
  const cmd = `ffmpeg -i ${address} -c:v copy -c:a copy -bsf:v h264_mp4toannexb -maxrate 500k -f matroska -`.split(' ')
  var child = child_process.spawn(cmd[0], cmd.splice(1), {
    stdio: ['ignore', 'pipe', process.stderr]
  })

  store[address] = {
    process: child,
    pool: []
  }

  return child
}

function stopProcess (address) {
  if (!store[address]) return 
  store[address].process && store[address].process.kill()
  store[address].pool = []
  store[address] = undefined
}

function addWatcher (address, id) {
  if (!store[address]) {
    startProcess(address)
  }

  if (store[address].pool.indexOf(id) < 0) {
    store[address].pool.push(id)
  }

}

function removeWatcher (address, id) {
  if (!store[address]) return
  const idIndex = store[address].pool.indexOf(id)
  if (idIndex < 0) return
  store[address].pool.splice(idIndex, 1)
  if (store[address].pool.length > 0) return
  stopProcess(address)
}

app.get('/camera/feed', (req, res) => {
  // Thanks to https://stackoverflow.com/q/28946904/1954789
  // const child_process = require('child_process')

  res.header('content-type', 'video/webm');

  const { ip } = req.query

  const id = Math.random()
  
  const address = `rtsp://admin:hik12345@${ip}/h264/ch1/main/av_stream`

  addWatcher(address, id)
  
  const child = store[address]

  child.process.stdio[1].pipe(res)

  

  res.on('close', () => {
      removeWatcher(address, id)
  })
})


app.listen(3000)s
```