<script>
	import LikeButton from '$lib/components/LikeButton.svelte'
	let { data } = $props()
	let posts = $derived(data.posts)
</script>

<div class="explore-container">
	<h1>Explore</h1>
	<p>Discover amazing artworks from our community</p>

	<div class="card-grid">
		{#each posts as post}
			<a href="/posts/{post.post_id}" class="post-card">
				<div class="image-container">
					<img src={post.file_url} alt={post.title || 'Artwork'} />
				</div>
				<div class="card-content">
					<h3>{post.title || 'Untitled'}</h3>
					<div class="card-footer">
						<span class="author">by {post.username}</span>
						<LikeButton {post} user={data.user} />
					</div>
				</div>
			</a>
		{/each}
	</div>

	{#if posts.length === 0}
		<p class="no-posts">No posts yet. Be the first to <a href="/create">create one</a>!</p>
	{/if}
</div>

<style>
	.explore-container {
		padding: 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.explore-container h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.explore-container > p {
		color: #666;
		margin-bottom: 2rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.post-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.post-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
	}

	.image-container {
		width: 100%;
		height: 280px;
		overflow: hidden;
		background: #f5f5f5;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-content {
		padding: 1rem;
	}

	.card-content h3 {
		margin: 0 0 0.75rem 0;
		font-size: 1.2rem;
		color: #333;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
	}

	.author {
		color: #666;
	}

	.no-posts {
		text-align: center;
		color: #666;
		margin-top: 3rem;
		font-size: 1.1rem;
	}

	.no-posts a {
		color: #667eea;
		text-decoration: none;
	}

	.no-posts a:hover {
		text-decoration: underline;
	}
</style>
