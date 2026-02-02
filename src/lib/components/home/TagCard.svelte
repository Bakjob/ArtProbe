<script>
	let { tag } = $props()

	const tagName = $derived(typeof tag === 'string' ? tag : (tag?.tag ?? tag?.name ?? ''))
	const fileUrl = $derived(tag?.file_url ?? tag?.image_url ?? null)
	const usageCount = $derived(
		typeof tag === 'object' && tag?.usage_count ? Number(tag.usage_count) : null
	)

	const href = $derived(tagName ? `/explore?tag=${encodeURIComponent(tagName)}` : '/explore')
</script>

<a {href} class="card" aria-label={tagName ? `Explore tag ${tagName}` : 'Explore'}>
	<div class="image-wrapper">
		{#if fileUrl}
			<img src={fileUrl} alt={tagName} loading="lazy" />
		{:else}
			<div class="image-placeholder">
				<span class="placeholder-text">#{tagName?.slice(0, 3)?.toUpperCase?.() ?? ''}</span>
			</div>
		{/if}
		<div class="overlay">
			<span class="tag-badge">#{tagName}</span>
		</div>
		{#if usageCount}
			<span class="post-count">{usageCount} {usageCount === 1 ? 'post' : 'posts'}</span>
		{/if}
	</div>
</a>

<style>
	.card {
		position: relative;
		display: block;
		border-radius: 16px;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		background: #111; /* fallback for edges */
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3); /* subtle frame */
		transition: transform 220ms ease, box-shadow 220ms ease;
		width: 100%;
		max-width: 336px;
	}

	.card:hover {
		transform: scale(1.08);
		box-shadow: 0 32px 72px rgba(0, 0, 0, 0.45);
		z-index: 10;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: 16px;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
		transition: transform 300ms ease;
	}

	.card:hover .image-wrapper img {
		transform: scale(1.1) rotateX(1deg);
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background: linear-gradient(135deg, #ffb84d 0%, #ff914d 100%);
	}

	.placeholder-text {
		font-size: 2rem;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 60%,
			rgba(0, 0, 0, 0.25) 100%
		); /* subtle fade at bottom */
		display: flex;
		align-items: flex-end;
		padding: 0.75rem;
	}

	.tag-badge {
		font-size: 1.4rem;
		font-weight: 800;
		color: #fff;
		text-shadow: 
			-2px -2px 0 #000,
			2px -2px 0 #000,
			-2px 2px 0 #000,
			2px 2px 0 #000,
			0 0 6px rgba(0,0,0,0.6);
		transition: text-shadow 220ms ease, transform 220ms ease;
	}

	.card:hover .tag-badge {
		text-shadow: 0 0 2px rgba(0,0,0,0.3);
		transform: translateY(-10px) scale(1.25);
	}

	.post-count {
		position: absolute;
		bottom: 10px;
		right: 12px;
		font-size: 1.2rem;
		font-weight: 700;
		color: #fff;
		text-shadow: 
			-1px -1px 0 #000,
			1px -1px 0 #000,
			-1px 1px 0 #000,
			1px 1px 0 #000;
		pointer-events: none; /* doesn’t block clicks */
		background: none; /* no box */
	}
</style>