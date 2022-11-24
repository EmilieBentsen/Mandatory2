<script>
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
	import { onDestroy, onMount } from "svelte/internal"

	let n
	

	
	
    
</script>
<h1 >Profile page</h1>
<button on:click={() => { notifier.info('Edit your profile info!', 7000) }}>Profile info</button>
<NotificationDisplay bind:this={n}/>
<body></body>



