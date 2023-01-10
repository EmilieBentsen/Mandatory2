<script>
  import { Link } from "svelte-navigator";
  const copyrightMessage = `© ${new Date().getFullYear()}`

</script>
<footer>
  <Link class="link" style="padding-right:30px;" to="/terms">Vilkår & privatliv</Link>
  <p id="copyright-year" style="font-size: 16px;">{copyrightMessage} Klimateket</p>
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
