<script lang="ts">
	import { onMount } from 'svelte'
	import favicon from '$lib/assets/favicon.svg'
	import NavBar from '$lib/components/nav/NavBar.svelte'
	import '$lib/styles/global.css'
	import { initLanguage } from '$lib/i18n'

	import type { LayoutProps } from './$types'

	let { data, children }: LayoutProps = $props()

	onMount(() => {
		initLanguage()
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	<NavBar loggedIn={data?.loggedIn} username={data?.user?.username} />
	{@render children()}
</main>

<style>
</style>
