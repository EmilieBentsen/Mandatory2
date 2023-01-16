<script>
  import { Router, Link, Route } from "svelte-navigator"
  import { BASE_URL } from "./store/globals.js"
  import { onMount } from "svelte/internal"
  import Home from "./pages/hjem/Hjem.svelte"
  import Login from "./pages/login/Login.svelte"
  import Profile from "./pages/profil/Profil.svelte"
  import Signup from "./pages/signup/Signup.svelte"
  import Terms from "./pages/terms/Terms.svelte"
  import Footer from "./components/footer/Footer.svelte"
  import Article from "./pages/artikler/Artikel.svelte"
  import Calender from "./pages/kalender/Kalender.svelte"
  import Contact from "./pages/kontakt/Kontakt.svelte"
  import Chat from "./pages/chat/Chat.svelte"
  import Message from "./pages/besked/Besked.svelte"
  import Inbox from "./pages/besked/Inbox.svelte"
  import About from "./pages/om/Om.svelte"
  import Debate from "./pages/debat/Debat.svelte"
  import Klimakrisen from "./pages/artikler/articles/Klimakrisen.svelte"
  import Oekologi from "./pages/artikler/articles/Oekologi.svelte"
  import Groenteknologi from "./pages/artikler/articles/Groenteknologi.svelte"
  import Natur from "./pages/artikler/articles/Natur.svelte"
  import Map from "./pages/kort/Kort.svelte"
  import Logo from "./components/logo/Logo.svelte"

  let loggedIn = null;

  async function authStatus() {
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
  onMount(authStatus)
</script>

<Router>
  <nav>
    {#if loggedIn === 'no'} 
    <Link class="link"to="/"><Logo/></Link>
    <Link class="link"to="/login">Log ind</Link>
    <Link class="link"to="/signup">Opret profil</Link>
    <Link class="link"to="/about">Om Klimateket</Link>
    <Link class="link"to="/contact">Kontakt</Link>
    <Link class="link"to="/article">Artikler</Link>
    {/if}

    {#if loggedIn === 'yes'}
    <Link class="link"to="/"><Logo/></Link>
    <Link class="link"to="/about">Om Klimateket</Link>
    <Link class="link"to="/contact">Kontakt</Link>
    <Link class="link"to="/debate">Debat</Link>
    <Link class="link"to="/chat">Chat</Link>
    <Link class="link"to="/inbox">Beskeder</Link>
    <Link class="link"to="/profile">Profil</Link>
    <Link class="link"to="/map">Kort</Link>
    <Link class="link"to="/calender">Kalender</Link>
    <Link class="link"to="/article">Artikler</Link>
    <Link class="link"to="/" on:click={logout}>Log ud</Link>

    {/if}
  </nav>

   <div>
    <Route path="/"><Home /></Route>
    <Route path="/terms"><Terms/></Route>
    <Route path="/login"><Login /></Route>
    <Route path="/signup"><Signup/></Route>
    <Route path="/article"><Article/></Route>
    <Route path="/klimakrisen"><Klimakrisen/></Route>
    <Route path="/oekologi"><Oekologi/></Route>
    <Route path="/groenteknologi"><Groenteknologi/></Route>
    <Route path="/natur"><Natur/></Route>
    <Route path="/calender"><Calender/></Route>
    <Route path="/contact"><Contact/></Route>
    <Route path="/about"><About/></Route>

    {#if loggedIn === 'yes'}
    <Route path="profile"><Profile /></Route>
    <Route path="chat"><Chat /></Route>
    <Route path="message"><Message /></Route>
    <Route path="inbox"><Inbox /></Route>
    <Route path="/debate"><Debate/></Route>
    <Route path="/map"><Map/></Route>

    {/if}   
  </div>
  <Footer/>
</Router>

<style>
</style>