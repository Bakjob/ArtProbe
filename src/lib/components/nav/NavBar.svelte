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
			<a href="/create" class="create-btn btn-style">Create Post</a>
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
	.btn-style {
		cursor: pointer;
		font-size: 1rem;
		padding: 0.6rem 1.2rem;
		border: none;
		border-radius: 8px;
		background: linear-gradient(90deg, #ffde59, #ff914d);
		color: #333;
		font-weight: bold;
		text-decoration: none;
		display: inline-block;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}
	.btn-style:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		color: #fff;
	}
	.btn-style:active {
		transform: translateY(0);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	}
	.create-btn {
		background-color: rgb(231, 164, 19);
		color: #0e0b0b;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		text-decoration: none;
		font-weight: bold;
		transition: opacity 0.2s;
	}
	.create-btn:hover {
		opacity: 0.8;
	}
</style>
