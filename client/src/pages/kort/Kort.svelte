<script>
  import io from "socket.io-client"
  const socket = io("http://localhost:8080")

  socket.on("update the ice", (data => {
    console.log(data.data)
    if(data.data === "ice1"){
      let ice =document.getElementById('ice')
      ice.src = "ice2.png"
    } else{
      let ice =document.getElementById('ice')
      ice.src = "ice1.png"
    }
  }))

  function sendIce1(){
    console.log("send ice")
    socket.emit("send ice", { data: "ice1" })
  }
  function sendIce2(){
    console.log("send ice")
    socket.emit("send ice", { data: "ice2" })
  }
  
</script>
<h1>Se indlandsisen smelte</h1>

<button on:click={sendIce2}>2012</button>
<br>
<br>
<button on:click={sendIce1}>1989</button>
<br>
<br>
<img id="ice">
<body></body>