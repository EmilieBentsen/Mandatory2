<script>
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
	import { BASE_URL } from "../../store/globals.js"
	import { onMount } from "svelte/internal"
  import io from "socket.io-client"

  let n
	let email;
	async function getEmail() {
    fetch(`${$BASE_URL}/api/fetchEmail`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }})
    .then((response) => response.json())
    .then((data) => {
      email = data.email
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  const socket = io("http://localhost:8080")

  socket.on("update the color", (data => {
    
    if(data.data === "summer"){
      document.body.style.backgroundImage = "url('sea.png')";
    } else{
      document.body.style.backgroundImage = "url('polarbear.png')";
    }
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

  }))

  function sendColorSummer(){
    socket.emit("client chooese a new color", { data: "summer" })
  }
  function sendColorWinter(){
    socket.emit("client chooese a new color", { data: "winter" })
  }
  onMount(getEmail)

</script>
<h1 >Velkommen {email}</h1>
<button on:click={() => { notifier.info('Edit your profile info!', 7000) }}>Profil info</button>
<NotificationDisplay bind:this={n}/>
<br>
<br>
<br>
<h3>Vælg tema</h3>
<button on:click={sendColorSummer}>Sommer</button>
<button on:click={sendColorWinter}>Vinter</button>
<body>
</body>



