<script>
	import { onMount } from 'svelte'
	let { post, user } = $props()

	onMount(async () => {
		// Hämta liked-status för posten om användaren är inloggad
		if (user) {
			try {
				const response = await fetch(`/api/handlelikes?postId=${post.post_id}`)
				const result = await response.json()
				post.liked = result.liked
			} catch (error) {
				console.error('Error fetching like status:', error)
			}
		}
	})

	async function toggleLike() {
		console.log('Toggling like for post:', post.post_id)
		try {
			const response = await fetch('/api/handlelikes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ postId: post.post_id })
			});
			const result = await response.json();
			console.log('API response:', result)
			if (result.error) {
				alert('You must be logged in to like posts');
				return;
			}
			post.liked = result.liked;
			post.likes += result.liked ? 1 : -1;
			console.log('Updated post:', post)
		} catch (error) {
			console.error('Error toggling like:', error);
		}
	}
</script>

<button class="like-btn" class:liked={post.liked} onclick={toggleLike}>
	{post.liked ? '❤️' : '🤍'} {post.likes}
</button>

<style>
	.like-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.9rem;
		color: #e53e3e;
		transition: color 0.2s;
	}

	.like-btn:hover {
		color: #c53030;
	}

	.like-btn.liked {
		color: #e53e3e;
	}
</style>