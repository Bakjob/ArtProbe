<script>
	import LikeButton from '$lib/components/LikeButton.svelte'
	import TagCard from '$lib/components/home/TagCard.svelte'
	import PostCard from '$lib/components/home/PostCard.svelte'
	import ArtistCard from '$lib/components/home/ArtistCard.svelte'
	
	let { data } = $props()
	
	$effect(() => {
		console.log('Home page data:', data)
	})
</script>

<main>
	<!-- HERO -->
	<section class="hero">
		<div class="hero-content">
			<h1>Welcome to Artprobe</h1>
			<p class="tagline">Art that grows with curiosity</p>
		</div>
	</section>

	<!-- EXPLORE -->
	<section class="explore">
		<h2>Begin exploring</h2>

		<div class="explore-grid">
			{#each data.trendingTags as tag}
				<TagCard {tag} />
			{/each}
		</div>
	</section>

	<!-- TRENDING POSTS -->
	<section class="trending">
		<h2>Trending Posts</h2>

		<div class="trending-grid">
			{#each data.trendingPosts as post}
				<PostCard {post} />
			{/each}
		</div>
	</section>

	<!-- ARTISTS -->
	<section class="artists">
		<h2>Artist Highlights</h2>

		<div class="artist-grid">
			{#each data.trendingArtists as artist}
				<ArtistCard {artist} />
			{/each}
		</div>
	</section>
</main>

<style scoped>
	/* HERO */
	.hero {
		height: 70vh;
		background-image: url('Commander.png');
		background-size: cover;
		background-position: center;
		display: flex;
		align-items: center;
	}

	.hero-content {
		padding-left: 4rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin: 0;
	}

	.tagline {
		margin-top: 0.5rem;
		padding: 0.4rem 0.8rem;
		display: inline-block;
		border: 2px solid #7a5cff;
	}

	/* EXPLORE */
	.explore {
		padding: 4rem 3rem;
		text-align: center;
	}

	.explore-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-top: 2rem;
	}

	/* TRENDING POSTS */
	.trending {
		padding: 4rem 3rem;
	}

	.trending h2 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.trending-grid {
		display: flex;
		overflow-x: auto;
		gap: 0.5rem;
		padding-bottom: 1rem;
		scrollbar-width: thin;
		scrollbar-color: #ccc transparent;
	}

	/* ARTISTS */
	.artists {
		padding: 4rem 3rem;
	}

	.artist-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;
	}
</style>
