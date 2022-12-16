<script>
  import io from "socket.io-client";
  import { BASE_URL } from "../../store/globals.js"
	import { onMount } from "svelte/internal"

  const socket = io("http://localhost:8080");

  let txt = "";
  let setUser = false;
	let email;

	async function getEmail() {
    fetch(`${$BASE_URL}/api/email`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }})
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      email = data.email
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }


  socket.on("update text", (data) => {
    const child = document.createElement("a");
    child.innerText = data.data;
    child.onclick = async function(){ fetch(`${$BASE_URL}/api/receiver`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({useremail: email}),
      })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `http://localhost:5173/message?email=${child.innerText}`
      })
      .catch((error) => {
        console.error('Error:', error)
      }); }
    document.getElementById("chat").appendChild(child);
  });

  function sendText() {
    socket.emit("send text", { data: email + ": " + txt });
  }


  onMount(getEmail)

</script>

<body>
  <div id="container">
    <h1>Klima chatten</h1>

      <p>Hej {email}</p>
      <label>Skriv din chat besked her, alle kan læse den</label>
      <input bind:value={txt} type="text" />
      <button on:click={sendText}>Send text</button>
    <div id="chat">

    </div>
  </div>
</body>

<style>

  #container {
    margin-bottom: 700px;
    margin-left: 175px;
    margin-top: 50px;
    padding: 16px;
    width: 600px;
    background-color: white;
  }
  button {
    background-color: #000000;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 40%;
  }

  input {
    width: 40%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    background-color: white;
    color: black;
  }
</style>
