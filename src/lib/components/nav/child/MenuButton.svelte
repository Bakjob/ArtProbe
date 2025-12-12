<script>
  export let label = '☰'
  export let ariaLabel = 'Open menu'
  export let className = ''
</script>

<button class="menu-btn {className}" aria-label={ariaLabel} on:click>
  {label}
</button>

<style>
  .menu-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: inherit;
    padding: 0.5rem;
  }
</style>
