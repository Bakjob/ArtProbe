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
			{#each data.trendingTags.slice(0,10) as tag}
				<TagCard {tag} />
			{/each}
		</div>
	</section>

	<!-- TRENDING POSTS -->
	<section class="posts-trending">
		<h2>Trending Posts</h2>

		<div class="trending-grid">
			{#each data.trendingPosts.slice(0,20) as post}
				<PostCard {post} />
			{/each}
		</div>
	</section>

	<!-- TRENDING ARTISTS -->
	<section class="artists-trending">
		<h2>Trending Artists</h2>

		<div class="artist-grid">
			{#each data.trendingArtists.slice(0,20) as artist}
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
	text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
}

.tagline {
	margin-top: 0.5rem;
	padding: 0.4rem 0.8rem;
	display: inline-block;
	border-radius: 8px;
	font-weight: 500;
	font-size: 1.9rem;
	color: #f29c1b; /* more orange */
	text-shadow:
		-1px -1px 0 #b18406,
		1px 1px 0 #000; /* black outline for contrast */
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	position: relative;
	animation: shimmer 5s infinite;
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
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* bigger min-width for visibility */
		gap: 1rem;
		justify-items: center;
		overflow: visible; /* allows hover shadow to show */
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
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	/* ARTISTS */
	.artists-trending {
		padding: 2rem 3rem;
		text-align: center;
	}

	.artist-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1.5rem;
	}

</style>