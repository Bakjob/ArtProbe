<script>
  import MenuButton from './child/MenuButton.svelte'
  import MenuDrawer from './child/MenuDrawer.svelte'
  
  let open = false
  const drawerPosition = 'right' // ändra till 'left' om du vill
</script>

<MenuButton label="☰" ariaLabel="Open navigation" on:click={() => open = !open} />

<MenuDrawer {open} position={drawerPosition} on:close={() => open = false} />

<style>
  /* Component wrapper styles */
</style>
