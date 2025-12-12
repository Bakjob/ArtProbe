<script>
  let {
    label = '☰',
    ariaLabel = 'Open menu',
    className = '',
    onClick = () => {}
  } = $props()
</script>

<button type="button" class="menu-btn {className}" aria-label={ariaLabel} onclick={onClick}>
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
