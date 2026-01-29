<script>
	let { artist } = $props()

	const username = $derived.by(() => artist?.username ?? '')
	const totalLikes = $derived.by(() => {
		const parsed = Number(artist?.total_likes ?? 0)
		return Number.isFinite(parsed) ? parsed : 0
	})

	const avatarUrl = $derived(artist?.avatar_url ?? null)

	const initials = $derived.by(() => {
		const name = String(username || '').trim()
		if (!name) return ''
		return name.slice(0, 2).toUpperCase()
	})

	const href = $derived(username ? `/profile/${encodeURIComponent(username)}` : '/profile')
</script>

<a class="card" {href} aria-label={username ? `View profile ${username}` : 'View profile'}>
	<div class="avatar" aria-hidden="true">
		{#if avatarUrl}
			<img class="avatar-img" src={avatarUrl} alt="" loading="lazy" />
		{:else}
			{initials}
		{/if}
	</div>
	<div class="info">
		<h4 class="name">{username}</h4>
		<p class="meta">{totalLikes} total likes</p>
	</div>
</a>

<style>
	.card {
		display: grid;
		grid-template-columns: 44px 1fr;
		gap: 0.75rem;
		align-items: center;
		padding: 0.85rem;
		border-radius: 12px;
		border: 1px solid rgba(0, 0, 0, 0.12);
		background: rgba(255, 255, 255, 0.75);
		text-decoration: none;
		color: inherit;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			background 160ms ease;
	}

	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
		background: rgba(255, 255, 255, 0.9);
	}

	.avatar {
		width: 44px;
		height: 44px;
		border-radius: 999px;
		display: grid;
		place-items: center;
		font-weight: 800;
		letter-spacing: 0.03em;
		color: #2b2b2b;
		background: linear-gradient(135deg, rgba(122, 92, 255, 0.25), rgba(255, 145, 77, 0.2));
		border: 1px solid rgba(0, 0, 0, 0.08);
		overflow: hidden;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.name {
		margin: 0;
		font-size: 1rem;
		line-height: 1.2;
	}

	.meta {
		margin: 0.15rem 0 0;
		font-size: 0.85rem;
		color: rgba(0, 0, 0, 0.6);
	}
</style>
