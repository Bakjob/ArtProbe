<script>
	import { page } from '$app/stores'
	import AuthButton from '$lib/components/AuthButton.svelte'

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/explore', label: 'Explore' },
		{ href: '/test', label: 'Test page' },
		{ href: '/about', label: 'About' }
	]

	let { pathname = undefined, loggedIn = false } = $props()

	const visibleLinks = $derived(
		loggedIn ? [...links, { href: '/profile/edit', label: 'Profile' }] : links
	)
</script>

<nav class="navbar">
	<div class="brand">ArtProbe</div>
	<ul class="nav-list">
		{#each visibleLinks as link}
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
		<AuthButton {loggedIn} />
	</div>
</nav>

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
		transition: color 0.3s;
		display: inline-block;
		transform-origin: center;
	}

	/* Sliding underline */
	.nav-item a::after {
	content: '';
	position: absolute;
	width: 0;
	height: 2px;
	bottom: -2px;
	left: 0;
	background: linear-gradient(90deg, #ffde59, #ff914d);
	box-shadow: 0 0 4px #ffde59, 0 0 8px #ff914d;
	transition: width 0.4s ease, transform 0.2s ease;
}


	/* Fun hover / selected effect */
	.nav-item a.selected::after,
	.nav-item a:hover::after {
		width: 100%;
		transform: scaleX(1.2);
	}
	.nav-item a:hover {
		color: #ffcc00;
	}
</style>
