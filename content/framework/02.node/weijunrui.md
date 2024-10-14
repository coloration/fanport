``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/tailwindcss/2.2.7/tailwind.css">
</head>
<body class="bg-gray-200 flex justify-center items-center" style="height: 100vh;">
  <div class="shadow-lg rounded-xl flex-none w-80 md:w-xl">
    
    <blockquote class="rounded-t-xl bg-white px-6 py-8 md:p-10 text-4xl leading-8 md:leading-8 font-semibold text-gray-900">
      <span id="signal" class="font-bold text-purple-500">+00.000</span>
      <span class="ml-2 text-2xl font-bold">mA</span>
    </blockquote>
    <figcaption class="flex items-center space-x-4 p-6 md:px-10 md:py-6 bg-gradient-to-br rounded-b-xl leading-6 font-semibold text-white from-purple-500 to-indigo-500">
      <h3 class="text-2xl">Signal Card</h3>
    </figcaption>
  </div>
<script>
const socket = new WebSocket('ws://192.168.0.7:8080')
const singalDOM = document.getElementById('signal')
socket.binaryType = 'arraybuffer'

socket.onopen = function () {
  console.log('connect success!')
	socket.send("$00");
}

socket.onerror = function (e) {
  console.log('connect error', e)
}

socket.onmessage = function (msg) {
  // console.log(msg)

  var n = 7
  if(msg.data.substr(0,1)=='>'){
    const p1 = msg.data.substr(1+n,n)
	  console.log(
      msg.data.substr(1,n),
      msg.data.substr(1+n,n),
      msg.data.substr(1+n*2,n),
      msg.data.substr(1+n*3,n),
      msg.data.substr(1+n*4,n),
      msg.data.substr(1+n*5,n),
      msg.data.substr(1+n*6,n),
      msg.data.substr(1+n*7,n),
      msg.data.substr(1+n*8,n),
      msg.data.substr(1+n*9,n),
      msg.data.substr(1+n*10,n),
      msg.data.substr(1+n*11,n),
      msg.data.substr(1+n*12,n),
      msg.data.substr(1+n*13,n),
      msg.data.substr(1+n*14,n),
      msg.data.substr(1+n*15,n)
    )

    singalDOM.innerHTML = p1
  }	
}


</script>
</body>
</html>
```


``` ts
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res){
res.send('<h1>Welcome Realtime Server</h1>');
})

const socket = io.connect('ws://192.168.0.7:23')

socket.on('event', data => {
  console.log(data)
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})
```