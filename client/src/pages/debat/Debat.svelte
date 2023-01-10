<script>
import { BASE_URL } from "../../store/globals.js"
import { onMount } from "svelte/internal"

let posts = [];
let post;

async function getPosts() {
  fetch(`${$BASE_URL}/api/fetchPosts`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
  }})
  .then((response) => response.json())
  .then((data) => {
    posts = data.data
    console.log('Success:', data)
    for (let i = 0; i < posts.length; i++) {
      const div = document.createElement("div");
      div.style.border = "1px solid black"
      div.style.backgroundColor = "white"
      div.style.opacity = "80%"

      const child2 = document.createElement("h4");
      child2.innerText = posts[i].writer + ":";
      const child = document.createElement("p");
      child.innerText = posts[i].post;
      div.appendChild(child2)
      div.appendChild(child)
      document.getElementById("posts").appendChild(div);
    }
  })
  .catch((error) => {
    console.error('Error:', error)
  });
}

async function writePost () {
  fetch(`${$BASE_URL}/api/writePost`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({post: post}),
    })
  .then((response) => response.json())
  .then((data) => {
    window.location.href = '/debate'
  })
  .catch((error) => {
    console.error('Error:', error)
  });
}

onMount(getPosts)
</script>
<h1>Debat</h1>
<textarea bind:value={post} rows="10" cols="60" style="font-size: 20px;color: black; background-color: white"/>
<br>
<br>
<button on:click={writePost}>Skriv indlæg</button>
<br>
<br>
<div id="posts"></div>
<body></body>
<style>
  textarea {
    opacity: 80%;
  }
</style>