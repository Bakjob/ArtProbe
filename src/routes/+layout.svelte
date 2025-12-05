<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import NavBar from '$lib/components/NavBar.svelte'
	import AuthButton from '$lib/components/AuthButton.svelte'
	
	import type { LayoutProps } from './$types'

	let { data, children }: LayoutProps = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	<NavBar />
	<AuthButton loggedIn={data.loggedIn} />
	{@render children()}
</main>

<style>
</style>
