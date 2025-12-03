<script lang="ts">
  let { loggedIn }: { loggedIn: boolean } = $props()

  async function logout() {
    await fetch('/auth/logout', { method: 'POST' })
    window.location.reload()
  }
</script>

<button onclick={logout} disabled={!loggedIn}>
  {#if loggedIn}
    Logout 🌌✨
  {:else}
    Not logged in
  {/if}
</button>
<style scoped>
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
  }

  button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
</style>