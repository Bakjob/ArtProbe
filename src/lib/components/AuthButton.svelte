<script lang="ts">
	import { language, t } from '$lib/i18n'

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

<button class="nav-button" onclick={loggedIn ? logout : login}>
	{#if loggedIn}
		{t($language, 'logout')}
	{:else}
		{t($language, 'login')}
	{/if}
</button>

<style scoped>
</style>
