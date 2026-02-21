<script>
	import { page } from '$app/stores'
	import AuthButton from '$lib/components/AuthButton.svelte'
	import MenuButton from '$lib/components/nav/children/MenuButton.svelte'
	import MenuDrawer from '$lib/components/nav/children/MenuDrawer.svelte'
	import { language, t } from '$lib/i18n'

	const links = [
		{ href: '/', labelKey: 'home' },
		{ href: '/explore', labelKey: 'explore' },
		{ href: '/gigs', labelKey: 'gigs' },
		{ href: '/about', labelKey: 'about' }
	]

	let { pathname = undefined, loggedIn = false, username = null } = $props()
	let menuOpen = $state(false)

	const visibleLinks = $derived.by(() => {
		const base =
			loggedIn && username
				? [
						...links,
						{ href: `/profile/${username}`, labelKey: 'profile' },
						{ href: '/settings', labelKey: 'settings' }
					]
				: links

		return base.map((link) => ({
			...link,
			label: link.labelKey ? t($language, link.labelKey) : link.label
		}))
	})
</script>

<nav class="navbar">
	<a href="/" class="brand">ArtProbe</a>
	<div class="right">
		{#if loggedIn}
			<a href="/posts/create" class="nav-button">{t($language, 'createPost')}</a>
			<a href="/settings" class="nav-button">{t($language, 'settings')}</a>
		{/if}
		<MenuButton ariaLabel={t($language, 'openMenu')} onClick={() => (menuOpen = true)} />
		{#if loggedIn && username}
			<span>{t($language, 'welcomeUser', { username })}</span>
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
