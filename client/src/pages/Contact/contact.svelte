<script>
    import  io  from "socket.io-client"


const socket = io("http://localhost:8080")

socket.on("update the color", (data => {
    console.log(data.data)
    document.body.style.backgroundColor = data.data;
}))
let colorValue = "#0000000"

function sendColor(){
    socket.emit("client chooese a new color", { data: colorValue })
}
let txt = ""
let chat = ""
let username = ""
let setUser = false;

socket.on("update text", (data => {
    const child = document.createElement('p');
    child.innerText = data.data;
    document.getElementById("container").appendChild(child);

}))

function sendText(){
    socket.emit("send text", { data: username + " :" + txt})
}

function setUsername(){
    setUser = true;
}




</script>
<body>
    <input bind:value={username} type="text">
<button on:click={setUsername}>Enter username</button>

{#if setUser}
<input bind:value={txt} type="text">
<button on:click={sendText}>Send text</button>
{/if}

<div id="container"></div>

<input bind:value={colorValue} type="color">
<button on:click={sendColor}>Send color</button>
</body>
