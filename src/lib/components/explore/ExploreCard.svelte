<script>
	import LikeButton from '$lib/components/LikeButton.svelte'

	let { post, user } = $props()
</script>

<div class="post-card">
	<a href="/posts/{post.post_id}" class="post-link">
		<div class="image-container">
			<img src={post.file_url} alt={post.title || 'Artwork'} />
		</div>
		<div class="card-content">
			<h3>{post.title || 'Untitled'}</h3>
			<div class="card-footer">
				<span class="author">by {post.username}</span>
			</div>
		</div>
	</a>
	<LikeButton {post} {user} />
</div>

<style>
	.post-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		position: relative;
	}

	.post-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
	}

	.post-link {
		text-decoration: none;
		color: inherit;
		display: block;
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

	.post-card > :global(.like-btn) {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
</style>
