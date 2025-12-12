<script>
	import { page } from '$app/stores'
	import AuthButton from '$lib/components/AuthButton.svelte'
	import MenuButton from '$lib/components/nav/children/MenuButton.svelte'
	import MenuDrawer from '$lib/components/nav/children/MenuDrawer.svelte'

	const links = [
		{ href: '/', label: 'Home' },
		{ 
			label: 'Explore', 
			dropdown: [
				{ href: '/explore/gigs', label: 'Explore Gigs' },
				{ href: '/explore/art', label: 'Explore Art' }
			]
		},
		{ href: '/test', label: 'Test page' },
		{ href: '/about', label: 'About' },
		{ href: '/create', label: 'Create' }
	]

	let { pathname = undefined, loggedIn = false, username = null } = $props()
	let menuOpen = $state(false)

	const visibleLinks = $derived(
		loggedIn && username ? [...links, { href: `/profile/${username}`, label: 'Profile' }] : links
	)
</script>

<nav class="navbar">
	<div class="brand">ArtProbe</div>
	<div class="right">
		<MenuButton ariaLabel="Open menu" onClick={() => (menuOpen = true)} />
		{#if loggedIn && username}
			<span>Welcome, {username}!</span>
		{/if}
		<AuthButton {loggedIn} />
	</div>
</nav>

<MenuDrawer
	open={menuOpen}
	links={links}
	pathname={pathname ?? $page.url.pathname}
	loggedIn={loggedIn}
	username={username}
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
	}
</style>
