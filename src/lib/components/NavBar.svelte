<script>
	import { page } from '$app/stores'
	import AuthButton from '$lib/components/AuthButton.svelte'

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
		{ href: '/about', label: 'About' }
	]

	let { pathname = undefined, loggedIn = false, username = null } = $props()

	const visibleLinks = $derived(
		loggedIn && username ? [...links, { href: `/profile/${username}`, label: 'Profile' }] : links
	)
</script>

<nav class="navbar">
	<div class="brand">ArtProbe</div>
	<ul class="nav-list">
		{#each visibleLinks as link}
			<li class="nav-item">
				{#if link.dropdown}
					<span class="dropdown-trigger">
						{link.label} ▼
					</span>
					<div class="dropdown-menu">
						{#each link.dropdown as item}
							<a 
								href={item.href}
								class:selected={(pathname ?? $page.url.pathname) === item.href}
							>
								{item.label}
							</a>
						{/each}
					</div>
				{:else}
					<a
						href={link.href}
						class:selected={(pathname ?? $page.url.pathname) === link.href}
						aria-current={(pathname ?? $page.url.pathname) === link.href ? 'page' : undefined}
					>
						{link.label}
					</a>
				{/if}
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
		box-shadow:
			0 0 4px #ffde59,
			0 0 8px #ff914d;
		transition:
			width 0.4s ease,
			transform 0.2s ease;
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

	/* Dropdown */
	.nav-item {
		position: relative;
	}

	.dropdown-trigger {
		color: white;
		font-size: 1rem;
		cursor: pointer;
		padding-bottom: 0.25rem;
		display: inline-block;
		transition: color 0.3s;
	}

	.dropdown-trigger:hover {
		color: #ffcc00;
	}

	.dropdown-menu {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		background: #1a1a1a;
		border-radius: 8px;
		padding: 0.5rem 0;
		min-width: 180px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		z-index: 100;
		margin-top: 0.25rem;
	}

	.nav-item:hover .dropdown-menu {
		display: block;
	}

	.dropdown-menu a {
		display: block;
		padding: 0.75rem 1rem;
		color: white;
		text-decoration: none;
		transition: background 0.2s;
	}

	.dropdown-menu a:hover {
		background: rgba(255, 222, 89, 0.1);
		color: #ffcc00;
	}

	.dropdown-menu a.selected {
		background: rgba(255, 222, 89, 0.2);
		color: #ffde59;
	}
</style>
