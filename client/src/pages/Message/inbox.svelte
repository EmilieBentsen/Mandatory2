<script>
    import { BASE_URL } from "../../store/globals.js"
	import { onMount } from "svelte/internal"

    let messages = [];
    async function getMessages() {
    fetch(`${$BASE_URL}/api/messages`, {
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
        const child2 = document.createElement("h4");
        child2.innerText = messages[i].sender + ":";
        const child = document.createElement("p");
        child.innerText = messages[i].message;
        document.getElementById("messages").appendChild(child2);
        document.getElementById("messages").appendChild(child);

        }
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }
onMount(getMessages)
</script>
<body>
<div id="container">
    <h1>Beskeder</h1>
    <div id="messages"></div>
</div>

</body>

<style>
        #container {
      margin-bottom: 700px;
      margin-left: 175px;
      margin-top: 50px;
      padding: 16px;
      width: 600px;
      
    }
</style>