<script>
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
	import { BASE_URL } from "../../store/globals.js"
	import { onMount } from "svelte/internal"


	let n
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
      email = data.email
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  onMount(getEmail)

   
</script>
<h1 >Hi {email}</h1>
<button on:click={() => { notifier.info('Edit your profile info!', 7000) }}>Profile info</button>
<NotificationDisplay bind:this={n}/>
<body></body>



