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

	<!-- TRENDING TAGS -->
	<section class="tags-trending">
		<h2>Trending Tags</h2>

		<div class="tag-grid">
			{#each data.trendingTags as tag}
				<TagCard {tag} />
			{/each}
		</div>
	</section>

	<!-- TRENDING POSTS -->
	<section class="posts-trending">
		<h2>Trending Posts</h2>

		<div class="trending-grid">
			{#each data.trendingPosts as post}
				<PostCard {post} />
			{/each}
		</div>
	</section>

	<!-- TRENDING ARTISTS -->
	<section class="artists-trending">
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
		border-radius: 8px;
		font-weight: 500;
		color: #7a5cff;
		background: rgba(122, 92, 255, 0.2);
		font-size: 1.5rem;
	}

	/* TRENDING TAGS */
	.tags-trending {
		padding: 2rem 3rem;
		text-align: center;
	}

	.tags-trending h2 {
		margin-bottom: 2rem;
	}

	.tag-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.5rem;
	}

	/* TRENDING POSTS */
	.posts-trending {
		padding: 2rem 3rem;
	}

	.posts-trending h2 {
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
	.artists-trending {
		padding: 2rem 3rem;
		text-align: center;
	}

	.artist-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;
	}
</style>
