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
		Logout 🌌✨
	{:else}
		Log in
	{/if}
</button>

<style scoped>
	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border: none;
		border-radius: 4px;
		background-color: #0070f3;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:disabled {
		background-color: #999;
		cursor: not-allowed;
	}

	button:hover:enabled {
		background-color: #005bb5;
	}
</style>
