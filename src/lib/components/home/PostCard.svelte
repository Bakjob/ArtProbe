<script>
	import LikeButton from '$lib/components/LikeButton.svelte'

	let { post, user = null } = $props()

	const href = $derived(`/posts/${post.post_id}`)
	const title = $derived(post.title || 'Untitled')
	const username = $derived(post.username || '')
</script>

<div class="card">
	<a class="link" {href} aria-label={title}>
		<img class="image" src={post.file_url} alt={title} loading="lazy" />
		<div class="overlay">
			<h4 class="title">{title}</h4>
			{#if username}
				<p class="meta">by {username}</p>
			{/if}
		</div>
	</a>

	<div class="like">
		<LikeButton {post} {user} />
	</div>
</div>

<style>
	.card {
		position: relative;
		flex: 0 0 190px; /* tight cards in a row */
		height: 190px;
		border-radius: 10px;
		overflow: hidden;
		background: #111;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
	}

	.link {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: inherit;
	}

	.image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transform: scale(1);
		transition: transform 180ms ease;
	}

	.card:hover .image {
		transform: scale(1.03);
	}

	.overlay {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.6rem 0.7rem;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 70%);
		pointer-events: none; /* keep link click simple */
	}

	.title {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 600;
		color: #fff;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		display: -webkit-box;
		line-clamp: 1;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.meta {
		margin: 0.1rem 0 0;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	.like {
		position: absolute;
		top: 0.35rem;
		right: 0.35rem;
		z-index: 2;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 999px;
		padding: 0.25rem 0.35rem;
		backdrop-filter: blur(6px);
	}
</style>
