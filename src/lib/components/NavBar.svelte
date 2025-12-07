<script>
	import { page } from '$app/stores'
	import AuthButton from '$lib/components/AuthButton.svelte'

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/explore', label: 'Explore' },
		{ href: '/home', label: 'Home page' },
		{ href: '/about', label: 'About' }
	]

	// props from parent (Svelte 5 $props())
	let { pathname = undefined, loggedIn = false } = $props()
</script>

<nav class="navbar">
	<div class="brand">ArtProbe</div>
	<ul class="nav-list">
		{#each links as link}
			<li class="nav-item">
				<a
					href={link.href}
					class:selected={(pathname ?? $page.url.pathname) === link.href}
					aria-current={(pathname ?? $page.url.pathname) === link.href ? 'page' : undefined}
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
	<div class="right">
		<AuthButton loggedIn={loggedIn} />
	</div>
</nav>

<style scoped>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: #333;
		color: white;
	}
	.brand {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.nav-list {
		list-style: none;
		display: flex;
		gap: 1.5rem;
		margin: 0;
		padding: 0;
	}
	.right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.nav-item a {
		color: white;
		text-decoration: none;
		font-size: 1rem;
		position: relative;
		padding-bottom: 0.25rem;
	}
	.nav-item a.selected,
	.nav-item a:hover {
		border-bottom: 2px solid white;
	}
</style>
