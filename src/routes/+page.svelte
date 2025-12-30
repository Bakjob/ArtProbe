<script>
	import LikeButton from '$lib/components/LikeButton.svelte'
	
	let { data } = $props()
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
			<article class="card">
				<img src="The tenebroeus.png" alt="The tenebroeus" />
				<h3>2D digital art</h3>
				<p>Bold ideas in digital form</p>
			</article>

			<article class="card">
				<img src="cell.png" alt="cell" />
				<h3>Traditional art</h3>
				<p>Art that breathes through paper</p>
			</article>

			<article class="card">
				<img src="goku.png" alt="goku" />
				<h3>3D art</h3>
				<p>Shapes that come alive in 3D</p>
			</article>
		</div>
	</section>

	<!-- TRENDING POSTS -->
	<section class="trending">
		<h2>Trending Posts</h2>

		<div class="trending-grid">
			{#each data.trendingPosts as post}
				<div class="trending-card">
					<a href="/posts/{post.post_id}" class="trending-link">
						<img src={post.file_url} alt={post.title || 'Artwork'} />
						<div class="trending-info">
							<h4>{post.title || 'Untitled'}</h4>
							<p>by {post.username}</p>
						</div>
					</a>
					<LikeButton {post} user={data.user} />
				</div>
			{/each}
		</div>
	</section>

	<!-- ARTISTS -->
	<section class="artists">
		<h2>Artist Highlights</h2>

		<div class="artist-grid">
			<div class="artist-card">
				<img src="nate.png" alt="" />
				<h4>James May</h4>
				<span>2D digital art</span>
			</div>

			<div class="artist-card">
				<img src="/images/artist2.jpg" alt="" />
				<h4>Rocky Bo</h4>
				<span>Traditional art</span>
			</div>

			<!-- fler kort -->
		</div>
	</section>
</main>

<style scoped>
	/* HERO */
	.hero {
		height: 70vh;
		background-image: url('The tenebroeus.png');
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

	.card {
		border: 1px solid #222;
		background: transparent;
	}

	.card img {
		width: 100%;
		height: 300px;
		display: block;
		object-fit: cover;
	}

	.card h3 {
		margin: 0.8rem;
	}

	.card p {
		margin: 0 0.8rem 1rem;
		font-size: 0.9rem;
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
		gap: 1rem;
		padding-bottom: 1rem;
		scrollbar-width: thin;
		scrollbar-color: #ccc transparent;
	}

	.trending-card {
		flex: 0 0 200px;
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s;
		position: relative;
	}

	.trending-card:hover {
		transform: translateY(-2px);
	}

	.trending-link {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.trending-link img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		display: block;
	}

	.trending-info {
		padding: 0.75rem;
	}

	.trending-info h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		color: #333;
	}

	.trending-info p {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		color: #666;
	}

	.trending-card > :global(.like-btn) {
		position: absolute;
		bottom: 0.75rem;
		right: 0.75rem;
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

	.artist-card img {
		width: 100%;
		height: 300px;
		display: block;
		object-fit: cover;
	}

	.artist-card h4 {
		margin: 0.4rem 0 0;
		font-size: 0.9rem;
	}

	.artist-card span {
		font-size: 0.75rem;
		opacity: 0.7;
	}
</style>
