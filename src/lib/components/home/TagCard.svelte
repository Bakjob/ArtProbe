<script>
	let { tag } = $props()

	const tagName = $derived(typeof tag === 'string' ? tag : (tag?.tag ?? tag?.name ?? ''))
	const fileUrl = $derived(tag?.file_url ?? tag?.image_url ?? null)
	const usageCount = $derived(typeof tag === 'object' && tag?.usage_count ? tag.usage_count : null)

	const href = $derived(tagName ? `/explore?tag=${encodeURIComponent(tagName)}` : '/explore')
</script>

<a {href} class="card" aria-label={tagName ? `Explore tag ${tagName}` : 'Explore'}>
	<div class="image-container">
		{#if fileUrl}
			<img src={fileUrl} alt={tagName} loading="lazy" />
		{:else}
			<div class="image-placeholder">#{tagName?.slice(0, 2)?.toUpperCase?.() ?? ''}</div>
		{/if}
	</div>
	<h3 class="title">#{tagName}</h3>
	{#if usageCount}
		<p class="meta">{usageCount} posts</p>
	{/if}
</a>

<style>
	.card {
		display: grid;
		grid-template-rows: auto 1fr;
		text-align: center;
		transition: --card 0.3s ease;
		border: 1px solid #222;
		background: transparent;
		padding: 0.75rem;
		border-radius: 10px;
		text-decoration: none;
		color: inherit;
	}

	/* Image container: start cropped, grow smoothly on hover */
	.image-container {
		width: 100%;
		max-height: 200px; /* initial cropped height */
		overflow: hidden; /* hide the rest of the image until expand */
		border-radius: 6px;
		margin-bottom: 1rem;
		transition:
			max-height 600ms cubic-bezier(0.2, 0.8, 0.2, 1),
			box-shadow 300ms;
		border: 1px solid rgba(0, 0, 0, 0.06); /* small border around images */
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
	}

	.image-container img {
		display: block;
		width: 100%;
		height: auto; /* natural aspect ratio */
		object-fit: cover; /* used if container forces size, but height is auto */
		transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1); /* subtle transform if you want */
	}

	.image-placeholder {
		height: 200px;
		display: grid;
		place-items: center;
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		color: #333;
		background: linear-gradient(135deg, rgba(122, 92, 255, 0.2), rgba(255, 145, 77, 0.15));
	}

	/* Hover: reveal more of the image by increasing container max-height.
     This pushes the following text down because the image container participates in layout. */
	.card:hover .image-container {
		max-height: 420px; /* expanded height — tweak as needed */
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	}

	/* Compress text spacing while image grows to create "giving space" effect */
	.title {
		margin: 0.5rem 0;
		transition:
			margin 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
			color 200ms;
	}

	.card:hover .title {
		margin: 0.25rem 0;
	}

	.title {
		font-size: 1.25rem;
		margin-top: 0.25rem;
	}

	.meta {
		margin: 0;
		font-size: 0.9rem;
		color: #666;
	}
</style>
