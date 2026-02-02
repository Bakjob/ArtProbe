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
		grid-template-rows: auto 1fr; /* stack avatar and info vertically on smaller widths */
		grid-template-columns: 1fr; /* single column by default for mobile */
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: 16px;
		border: 1px solid rgba(0, 0, 0, 0.08);
		background: rgba(255, 255, 255, 0.85);
		text-decoration: none;
		color: inherit;
		width: 100%;
		max-width: 220px; /* keeps cards uniform in grids */
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease,
			background 0.18s ease;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
		background: rgba(255, 255, 255, 0.95);
	}

	.avatar {
		width: 64px;
		height: 64px;
		border-radius: 999px;
		display: grid;
		place-items: center;
		font-weight: 800;
		letter-spacing: 0.03em;
		color: #2b2b2b;
		background: linear-gradient(135deg, rgba(122, 92, 255, 0.25), rgba(255, 145, 77, 0.2));
		border: 1px solid rgba(0, 0, 0, 0.08);
		overflow: hidden;
		margin: 0 auto; /* center avatar in card */
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.info {
		text-align: center;
	}

	.name {
		margin: 0.4rem 0 0.15rem;
		font-size: 1.1rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.meta {
		margin: 0;
		font-size: 0.85rem;
		color: rgba(0, 0, 0, 0.6);
	}

	/* GRID RESPONSIVENESS: adapt cards in a homepage grid */
	@media(min-width: 600px) {
		.card {
			width: 100%;
		}
	}

	@media(min-width: 900px) {
		.card {
			width: 100%;
		}
	}
</style>