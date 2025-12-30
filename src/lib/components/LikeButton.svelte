<script>
	import { onMount } from 'svelte'
	let { post, user } = $props()

	let liked = $state(false)
	let likes = $derived(Number(post.likes) || 0)

	onMount(async () => {
		// Hämta liked-status för posten om användaren är inloggad
		if (user) {
			try {
				const response = await fetch(`/api/handlelikes?postId=${post.post_id}`)
				const result = await response.json()
				liked = result.liked
				// Uppdatera post också för konsistens
				post.liked = result.liked
			} catch (error) {
				console.error('Error fetching like status:', error)
				liked = false
				post.liked = false
			}
		} else {
			liked = false
			post.liked = false
		}
	})

	async function toggleLike(event) {
		event.stopPropagation(); // Förhindra att klicket bubblar upp till föräldra-element (t.ex. länkar)

		// Optimistisk uppdatering: Uppdatera UI direkt
		const wasLiked = liked;
		liked = !wasLiked;
		likes += wasLiked ? -1 : 1;
		// Uppdatera post också
		post.liked = liked;
		post.likes = likes;

		try {
			const response = await fetch('/api/handlelikes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ postId: post.post_id })
			});
			const result = await response.json();
			if (result.error) {
				alert('You must be logged in to like posts');
				// Återställ optimistisk uppdatering vid fel
				liked = wasLiked;
				likes += wasLiked ? 1 : -1;
				post.liked = liked;
				post.likes = likes;
				return;
			}
			// Uppdatera med korrekt värde från servern (om det skiljer sig)
			if (result.liked !== liked) {
				liked = result.liked;
				likes += result.liked ? 1 : -1;
				post.liked = liked;
				post.likes = likes;
			}
		} catch (error) {
			console.error('Error toggling like:', error);
			// Återställ vid nätverksfel
			liked = wasLiked;
			likes += wasLiked ? 1 : -1;
			post.liked = liked;
			post.likes = likes;
		}
	}
</script>

<button class="like-btn" class:liked onclick={toggleLike}>
	{liked ? '❤️' : '🤍'} {likes}
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