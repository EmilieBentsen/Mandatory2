<script>
  import { BASE_URL } from "../../store/globals.js";
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'

	let email = ''
	let password = ''
  let n
  
  async function login () {
    fetch(`${$BASE_URL}/api/login`, {
      method: 'POST', 
      credentials: 'include',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({useremail: email, userpass: password}),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.loggedIn === 'yes'){
        window.location.href = 'http://localhost:5173/profile'
        notifier.success('Hej! Velkommen til klimateket', 7000)
        
      }else{
        notifier.danger('Ukendt bruger, måske har du indtastet forkert email eller password', 7000)

        window.location.href = 'http://localhost:5173/login'
      }
      })
    .catch((error) => {
      console.error('Error:', error)
    });
  
	}

</script>
<NotificationDisplay bind:this={n}/>
  <h2>Log ind hos Klimateket</h2>
  <div class="container">
    <label for="email"><b>Email</b></label>
    <input
      bind:value={email}
      id="email"
      type="email"
      placeholder="Indtast email"
      name="email"
      required
    />

    <label for="psw"><b>Password</b></label>
    <input
      bind:value={password}
      id="password"
      type="password"
      placeholder="Indtast password"
      name="psw"
      required
    />
    <button type="submit" id="loginButton" on:click={login}>Log ind</button>
      <br>
    <label>
      <input type="checkbox" checked="checked" name="remember" /> Husk mig
    </label>
  </div>
<body></body>

<style>
  /* Full-width inputs */
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    background-color: white;
    color: black;
  }

  /* Set a style for all buttons */
  button {
    background-color: #0d3567;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 50%;
  }

  /* Add a hover effect for buttons */
  button:hover {
    opacity: 0.8;
  }

  /* Add padding to containers */
  .container {
    margin-top: px;
    margin-left: 60px;
    padding: 16px;
    width: 600px;
  }

</style>
