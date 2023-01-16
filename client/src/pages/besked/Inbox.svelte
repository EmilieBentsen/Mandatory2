<script>
  import { BASE_URL } from "../../store/globals.js"
	import { onMount } from "svelte/internal"

  let messages = [];
  async function fetchMessages() {
    fetch(`${$BASE_URL}/api/fetchMessages`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }})
    .then((response) => response.json())
    .then((data) => {
        messages = data.data
      console.log('Success:', data)
 
      for (let i = 0; i < messages.length; i++) {
        const div = document.createElement("div");
        div.style.border = "1px solid black"
        div.style.backgroundColor = "white"

        const child2 = document.createElement("h4");
        child2.innerText = messages[i].sender + ":";
        const child = document.createElement("p");
        child.innerText = messages[i].message;
        div.appendChild(child2)
        div.appendChild(child)
        document.getElementById("messages").appendChild(div);
        }
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }
  onMount(fetchMessages)
</script>
<body>
<div id="container">
    <h1>Beskeder</h1>
    <div id="messages"></div>
</div>
</body>
<style>
  
  p {
    border: 1px solid black  
  }
  #container {
    margin-bottom: 700px;
    margin-left: 175px;
    margin-top: 50px;
    padding: 16px;
    width: 600px;   
  }
</style>