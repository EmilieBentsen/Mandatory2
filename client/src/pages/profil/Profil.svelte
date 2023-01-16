<script>
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
	import { BASE_URL } from "../../store/globals.js"
	import { onMount } from "svelte/internal"
  import io from "socket.io-client"

  let n
	let email;
	async function fetchEmail() {
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

  socket.on("set new theme", (data => {
    
    if(data.data === "summer"){
      document.body.style.backgroundImage = "url('sea.png')"
    } else{
      document.body.style.backgroundImage = "url('polarbear.png')"
    }
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundAttachment = "fixed"

  }))

  function sendColorSummer(){
    socket.emit("choose new theme", { data: "summer" })
  }
  function sendColorWinter(){
    socket.emit("choose new theme", { data: "winter" })
  }
  onMount(fetchEmail)

</script>
<h1 >Velkommen {email}</h1>
<button on:click={() => { notifier.info('Rediger din profil info!', 7000) }}>Profil info</button>
<NotificationDisplay bind:this={n}/>
<br>
<br>
<br>
<h3>Vælg tema</h3>
<button on:click={sendColorSummer}>Sommer</button>
<button on:click={sendColorWinter}>Vinter</button>
<body>
</body>



