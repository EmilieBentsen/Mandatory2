<script>
  import { BASE_URL } from "../../store/globals.js";
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  import { passwordStrength } from 'check-password-strength'

  let passwordValid = false;
	let email = ''
	let password = ''
  let passwordRepeat = ''
  let n

  function validateInput() {
    //validate email with regular expression
    const validateEmail = email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(password === passwordRepeat && password.length >= 8 && validateEmail && passwordStrength(password).value === "Strong" ){
      passwordValid = true
      signup()
    }
    if( password !== passwordRepeat){
      notifier.info('Passwords skal være identiske', 7000)
    }
    if(!validateEmail){
      notifier.info('Ugyldig email, prøv igen!', 7000)
    }
    if(passwordStrength(password).value !== "Strong"){
      notifier.info('Password er for svagt, det skal være mindst 8 karakterer, indeholde store bogstaver, tegn og tal', 7000)
    }
    else{ 
    }
  }

  async function signup () {
    if(passwordValid){
      fetch(`${$BASE_URL}/api/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({useremail: email, userpass: password}),
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.tryAgain){
          notifier.danger('Du har allerede en profil, prøv at logge ind eller "glemt kodeord" ', 7000)
        }else{
          notifier.success('Profilen blev oprettet!', 7000)
          setTimeout(window.location.href = 'http://localhost:5173/login', 5000)
          ;
        }
      
      })
      .catch((error) => {
        console.error('Error:', error)
      });
    }		
	}
</script>
<NotificationDisplay bind:this={n}/>

<h2>Bliv en del af Klimateket</h2>
<div class="container">
  <p>Udfyld denne formular og opret en profil på Klimateket</p>

  <label for="email"><b>Email</b></label>
  <input bind:value={email} type="text" placeholder="Indtast email" name="email" required>

  <label for="psw"><b>Password</b></label>
  <input bind:value={password}
   type="password" placeholder="Indtast password" name="psw" required>

  <label for="psw-repeat"><b>Repeat Password</b></label>
  <input bind:value={passwordRepeat} type="password" placeholder="Gentag password" name="psw-repeat" required>
  
  <label>
  <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Husk mig
  </label>
  
  <p>Ved at oprette denne profil siger du ja til vores <a class="terms" href="/terms" style="color:dodgerblue">vilkår & privatliv</a>.</p>

<div class="center">
  <button type="submit" class="signupbtn" on:click={validateInput}>Opret profil</button>
</div>
</div>
<body>
</body>
<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}

 /*Full-width input fields */
 input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #ffffff;
  color: black;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: rgb(255, 255, 255);
  outline: none;
  color: black;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #0d3567;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  
}

button:hover {
  opacity:1;
}

/* Float cancel and signup buttons and add an equal width */

 .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {

  margin-left: 78px;
  padding: 16px;
  width: 600px;
  
  
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .signupbtn {
     width: 100%;
  }
}
</style>
