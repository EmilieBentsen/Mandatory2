<script>
  	import { BASE_URL } from "../../store/globals.js"
	  import { onMount } from "svelte/internal"

    let message;
    let receiver = "default"; 

    async function getReceiver() {
    fetch(`${$BASE_URL}/api/fetchReceiver`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }})
    .then((response) => response.json())
    .then((data) => {
      //use the querystring to get the receiver for the message
      let queryString = window.location.search;
      queryString = decodeURIComponent(queryString)
      let mySubString = queryString.substring(
      queryString.indexOf("=") + 1, 
      queryString.indexOf(":")
      );
      receiver = mySubString
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }
  async function sendMessage () {
      fetch(`${$BASE_URL}/api/sendMessage`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({receiver: receiver, message: message}),
      })
      .then((response) => response.json())
      .then((data) => {
          window.location.href = '/inbox'

      })
      .catch((error) => {
        console.error('Error:', error)
      });
	}
  onMount(getReceiver)
</script>
<body>
    <div id="container">
      <h1>Send besked til {receiver}</h1>
      
      <textarea bind:value={message} type="text" rows="20" cols="50" />
      <br>
      <button on:click={sendMessage}>send besked</button>

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
    button {
      background-color: #000000;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 40%;
    }
  
    textarea {
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
      background-color: white;
      color: black;
      opacity: 80%;
    }
  </style>
  