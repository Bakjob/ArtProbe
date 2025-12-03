<script lang="ts">
	import { page } from '$app/state'

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/explore', label: 'Explore' },
		{ href: '/home', label: 'Home page' },
		{ href: '/about', label: 'About' }
	]

    let currentPath = page.url?.pathname
	$: currentPath = page.url?.pathname // update automatically on route change
</script>

<nav class="navbar">
	<div class="brand">ArtProbe</div>
	<ul class="nav-list">
		{#each links as link}
			<li class="nav-item">
				<a
					href={link.href}
					class:selected={currentPath === link.href}
					aria-current={currentPath === link.href ? 'page' : undefined}
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
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
