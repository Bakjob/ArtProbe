<script>
	import { language, t } from '$lib/i18n'
	import { onMount } from 'svelte'
	let { post, user } = $props()

	let liked = $state(false)
	let likes = $derived(Number(post.likes) || 0)

	onMount(async () => {
		// Fetch like status when user is logged in
		if (user) {
			try {
				const response = await fetch(`/api/handlelikes?postId=${post.post_id}`)
				const result = await response.json()
				liked = result.liked
				// Keep post in sync
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
		event.stopPropagation() // Prevent click bubbling to parent (e.g., links)

		// Optimistic update: update UI immediately
		const wasLiked = liked
		liked = !wasLiked
		likes += wasLiked ? -1 : 1
		// Keep post in sync
		post.liked = liked
		post.likes = likes

		try {
			const response = await fetch('/api/handlelikes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ postId: post.post_id })
			})
			const result = await response.json()
			if (result.error) {
				alert(t($language, 'likeLoginRequired'))
				// Revert optimistic update on error
				liked = wasLiked
				likes += wasLiked ? 1 : -1
				post.liked = liked
				post.likes = likes
				return
			}
			// Sync with server value if it differs
			if (result.liked !== liked) {
				liked = result.liked
				likes += result.liked ? 1 : -1
				post.liked = liked
				post.likes = likes
			}
		} catch (error) {
			console.error('Error toggling like:', error)
			// Revert on network error
			liked = wasLiked
			likes += wasLiked ? 1 : -1
			post.liked = liked
			post.likes = likes
		}
	}
</script>

<button class="like-btn" class:liked onclick={toggleLike}>
	{liked ? '❤️' : '🤍'}
	{likes}
</button>

<style scoped>
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
