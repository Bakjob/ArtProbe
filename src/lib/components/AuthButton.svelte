<script lang="ts">
	let { loggedIn }: { loggedIn: boolean } = $props()

	async function logout() {
		await fetch('/auth/logout', { method: 'POST' })
		window.location.reload()
	}
	async function login() {
		// Redirect to a login page or open a login modal
		window.location.href = '/auth/login'
	}
</script>

<button onclick={loggedIn ? logout : login}>
	{#if loggedIn}
		Logout
	{:else}
		Log in
	{/if}
</button>

<style scoped>
</style>
