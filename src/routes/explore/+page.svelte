<script>
	import ExploreCard from '$lib/components/ExploreCard.svelte'

	const ads = [
		{
			title: 'Ancient Scroll',
			image: '/goku2.png',
			description: 'Secrets it holds… much power hmm',
			author: 'Master Li',
			price: '500 credits'
		},
		{
			title: 'Mystic Crystal',
			image: '/cell.png',
			description: 'Glow in the dark it does 💫',
			author: 'Crystal Sage',
			price: '750 credits'
		},
		{
			title: 'Yoda Plushie',
			image: '/goku.png',
			description: 'Cuteness strong with this one 🧸💚',
			author: 'Yoda Fan',
			price: '600 credits'
		},
		{
			title: 'Dragon Figurine',
			image: '/vegeta.png',
			description: 'Fierce protector of treasures 🐉',
			author: 'Dragon Master',
			price: '900 credits'
		},
		{
			title: 'Enchanted Map',
			image: '/frieza.png',
			description: 'Leads to hidden wonders 🗺️✨',
			author: 'Map Keeper',
			price: '850 credits'
		},
		{
			title: 'Phoenix Feather',
			image: '/trunks.png',
			description: 'Rebirth and renewal symbols 🔥',
			author: 'Phoenix Keeper',
			price: '950 credits'
		},
		{
			title: 'Wizard Hat',
			image: '/broly.png',
			description: 'Grants wisdom to the wearer 🎩',
			author: 'Wizard Master',
			price: '700 credits'
		},
		{
			title: 'Magic Wand',
			image: '/gohan.png',
			description: 'Channel your inner magic ✨',
			author: 'Magic User',
			price: '800 credits'
		},
		{
			title: 'Crystal Ball',
			image: '/piccolo.png',
			description: 'See into the future 🔮',
			author: 'Seer',
			price: '1000 credits'
		},
		{
			title: 'Crystal Ball',
			image: '/broly.png',
			description: 'See into the future 🔮',
			author: 'big balls',
			price: '10023 credits'
		},
		{
			title: 'Crystal Ball',
			image: '/gohan.png',
			description: 'See into the future 🔮',
			author: 'master balls',
			price: '13 credits'
		},
		{
			title: 'Crystal Ball',
			image: '/dodoria.png',
			description: 'See into the future 🔮',
			author: 'huge balls',
			price: '1000 credits'
		}
	]
</script>

<div class="explore-container">
	<h1>Explore</h1>
	<p>Discover new content and artworks here.</p>
	<p>Return to the <a href="/">home page</a>.</p>

	<div class="card-grid">
		{#each ads as ad}
			<ExploreCard {ad} />
		{/each}
	</div>
</div>

<style scoped>
	.explore-container {
		padding: 2rem;
		text-align: center;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}
</style>
