<script>
	let { tag } = $props()

	const tagName = $derived(typeof tag === 'string' ? tag : (tag?.tag ?? tag?.name ?? ''))
	const fileUrl = $derived(tag?.file_url ?? tag?.image_url ?? null)
	const usageCount = $derived(typeof tag === 'object' && tag?.usage_count ? Number(tag.usage_count) : null)

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
	</div>
	{#if usageCount}
		<p class="meta">{usageCount} {usageCount === 1 ? 'post' : 'posts'}</p>
	{/if}
</a>

<style>
	.card {
		position: relative;
		display: block;
		border-radius: 12px;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		background: #111;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		transition:
			transform 200ms ease,
			box-shadow 200ms ease;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		overflow: hidden;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 300ms ease;
	}

	.card:hover .image-wrapper img {
		transform: scale(1.05);
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background: linear-gradient(135deg, #7a5cff 0%, #ff914d 100%);
	}

	.placeholder-text {
		font-size: 1.75rem;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.7) 100%);
		display: flex;
		align-items: flex-end;
		padding: 0.75rem;
	}

	.tag-badge {
		font-size: 1rem;
		font-weight: 700;
		color: #fff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.meta {
		margin: 0;
		padding: 0.5rem 0.75rem;
		font-size: 0.8rem;
		color: #999;
		background: #1a1a1a;
		text-align: center;
	}
</style>
