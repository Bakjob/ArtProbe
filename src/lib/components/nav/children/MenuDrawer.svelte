<script>
	import { createEventDispatcher } from 'svelte'
	import { fly } from 'svelte/transition'
	import ThemeToggle from '$lib/components/settings/ThemeToggle.svelte'

	let {
		open = false,
		position = 'right',
		pathname = undefined,
		loggedIn = false,
		username = null,
		links = []
	} = $props()

	const dispatch = createEventDispatcher()

	// helper för att stänga
	function close() {
		dispatch('close')
	}
</script>

{#if open}
	<div
		class="overlay"
		role="button"
		tabindex="0"
		onclick={close}
		onkeydown={(e) => {
			if (e.key === 'Escape' || e.key === 'Enter') close()
		}}
	></div>

	<nav
		class="drawer {position}"
		transition:fly={{ x: position === 'right' ? 200 : -200, duration: 200 }}
	>
		{#each links as link}
			{#if link.dropdown}
				<div class="dropdown">
					<div class="dropdown-label">{link.label}</div>
					<div class="dropdown-items">
						{#each link.dropdown as sub}
							<a href={sub.href} onclick={close}>{sub.label}</a>
						{/each}
					</div>
				</div>
			{:else}
				<a href={link.href} onclick={close}>{link.label}</a>
			{/if}
		{/each}

		<div class="drawer-section">
			<ThemeToggle />
		</div>
	</nav>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99;
	}

	.drawer {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 250px;
		background: #1e1e1e;
		padding: 1rem;
		z-index: 100;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.drawer.right {
		right: 0;
		left: auto;
	}

	.drawer.left {
		left: 0;
		right: auto;
	}

	a {
		color: #ffde59;
		text-decoration: none;
	}

	a:hover {
		color: #ff914d;
	}

	.dropdown-label {
		color: #ffde59;
		font-weight: 600;
	}

	.dropdown-items {
		display: flex;
		flex-direction: column;
		padding-left: 0.5rem;
	}

	.drawer-section {
		margin-top: 0.5rem;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}
</style>
