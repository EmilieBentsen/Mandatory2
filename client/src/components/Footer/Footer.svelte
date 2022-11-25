<script>
  import { Link } from "svelte-navigator";
  const copyrightMessage = `© ${new Date().getFullYear()}`

</script>
<footer>
  <Link to="/terms">Terms & Privacy</Link>
  <p id="copyright-year">{copyrightMessage} Klimateket</p>
</footer>

<style>
    footer {
    
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;   /* Height of the footer */
    left: 0;
    text-align: center;
  }
</style>
