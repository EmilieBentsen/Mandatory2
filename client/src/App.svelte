<script>
  import { Router, Link, Route } from "svelte-navigator"
  import Home from "./pages/Home/Home.svelte"
  import Login from "./pages/Login/login.svelte"
  import Profile from "./pages/Profile/profile.svelte"
  import { BASE_URL } from "./store/globals.js"
  import { onMount } from "svelte/internal"
  import Signup from "./pages/SignUp/signup.svelte"
  import Terms from "./pages/Terms/terms.svelte"
  import Footer from "./components/Footer/Footer.svelte"
  import Article from "./pages/Article/article.svelte"
  import Calender from "./pages/Calender/calender.svelte";
  import Contact from "./pages/Contact/contact.svelte"
  import Chat from "./pages/Chat/chat.svelte"
  import Message from "./pages/Message/message.svelte";
  import Inbox from "./pages/Message/inbox.svelte";


  let loggedIn = null;
  async function getAuthStatus() {
    fetch(`${$BASE_URL}/api/loggedIn`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }})
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      loggedIn = data.loggedIn
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  async function logout () {
    fetch(`${$BASE_URL}/api/logout`,{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({loggedIn: 'no'}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
      loggedIn = data.loggedIn
    })
    .catch((error) => {
      console.error('Error:', error)
    });
      
	}
  onMount(getAuthStatus)
</script>

<Router>
  

  <nav>
    
    {#if loggedIn === 'no'} 
    <Link class="link"to="/"><img src="favicon3.png" width="45px" align="middle" style="padding-bottom: 20px;padding-right: 5px;"></Link>
    <Link class="link"to="/login">Log ind</Link>
    <Link class="link"to="/signup">Opret profil</Link>
    <Link class="link"to="/">Om Klimateket</Link>
    <Link class="link"to="/contact">Kontakt</Link>
    <Link class="link"to="/">Debat</Link>
    <Link class="link"to="/article">Artikler</Link>
    <Link class="link"to="/calender">Kalender</Link>



    {/if}
    {#if loggedIn === 'yes'}
    <Link class="link"to="/"><img src="favicon3.png" width="45px" align="middle" style="padding-bottom: 20px;padding-right: 5px;"></Link>
    <Link class="link"to="/" on:click={logout}>Log ud</Link>
    <Link class="link"to="/">Om Klimateket</Link>
    <Link class="link"to="/contact">Kontakt</Link>
    <Link class="link"to="/">Debat</Link>
    <Link class="link"to="/article">Artikler</Link>
    <Link class="link"to="/profile">Profile</Link>
    <Link class="link"to="/chat">Chat</Link>
    <Link class="link"to="/calender">Kalender</Link>
    <Link class="link"to="/inbox">Beskeder</Link>

    
    {/if}
  </nav> 
   <div>
    <Route path="/"><Home /></Route>
    <Route path="/terms"><Terms/></Route>
    <Route path="/login"><Login /></Route>
    <Route path="/signup"><Signup/></Route>
    <Route path="/article"><Article/></Route>
    <Route path="/calender"><Calender/></Route>
    <Route path="/contact"><Contact/></Route>



    {#if loggedIn === 'yes'}
    <Route path="profile"><Profile /></Route>
    <Route path="chat"><Chat /></Route>
    <Route path="message"><Message /></Route>
    <Route path="inbox"><Inbox /></Route>

    {/if}   
  </div>
  <Footer/>
</Router>

<style>

</style>