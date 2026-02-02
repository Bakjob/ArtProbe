<script>
	import { page } from '$app/stores'
	import AuthButton from '$lib/components/AuthButton.svelte'
	import MenuButton from '$lib/components/nav/children/MenuButton.svelte'
	import MenuDrawer from '$lib/components/nav/children/MenuDrawer.svelte'

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/explore', label: 'Explore' },
		{ href: '/gigs', label: 'Gigs' },
		{ href: '/about', label: 'About' }
	]

	let { pathname = undefined, loggedIn = false, username = null } = $props()
	let menuOpen = $state(false)

	const visibleLinks = $derived(
		loggedIn && username ? [...links, { href: `/profile/${username}`, label: 'Profile' }] : links
	)
</script>

<nav class="navbar">
	<a href="/" class="brand">ArtProbe</a>
	<div class="right">
		{#if loggedIn}
			<a href="/posts/create" class="nav-button">Create Post</a>
		{/if}
		<MenuButton ariaLabel="Open menu" onClick={() => (menuOpen = true)} />
		{#if loggedIn && username}
			<span>Welcome, {username}!</span>
		{/if}
		<AuthButton {loggedIn} />
	</div>
</nav>

<MenuDrawer
	open={menuOpen}
	links={visibleLinks}
	pathname={pathname ?? $page.url.pathname}
	{loggedIn}
	{username}
	on:close={() => (menuOpen = false)}
/>

<style scoped>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: #0e0b0b;
		color: rgb(231, 164, 19);
	}
	.brand {
		font-size: 1.5rem;
		font-weight: bold;
		color: rgb(231, 164, 19);
		text-decoration: none;
		transition: opacity 0.2s;
	}
	.brand:hover {
		opacity: 0.8;
	}
	.right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
