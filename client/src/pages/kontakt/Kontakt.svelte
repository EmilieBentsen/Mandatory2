<script>
  import { BASE_URL } from "../../store/globals.js"

  let message = "";

  async function sendContactEmail () {
    fetch(`${$BASE_URL}/api/sendContactEmail`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({message: message}),
    })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = 'http://localhost:5173/'
    })
    .catch((error) => {
      console.error('Error:', error)
    });
	}

</script>
<h1>Kontakt Klimateket</h1>
<p>Skriv en mail til Klimateket med spørgsmål, ris og ros. Vi svarer indenfor 24 timer!</p>
<p> Husk at skriv din email, hvis du ikke er logget ind</p>
<textarea bind:value={message} rows="10" cols="60" style="font-size: 20px;color: black; background-color: white"/>
    <br>
    <button on:click={sendContactEmail}>Send email</button>
<body>
</body>
<style>
  textarea {
    opacity: 50%;
  }
</style>