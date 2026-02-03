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
				<span class="placeholder-text">
					#{tagName?.slice(0, 3)?.toUpperCase?.() ?? ''}
				</span>
			</div>
		{/if}

		<div class="overlay">
			<span class="tag-badge">#{tagName}</span>
		</div>

		{#if usageCount}
			<span class="post-count">
				{usageCount} {usageCount === 1 ? 'post' : 'posts'}
			</span>
		{/if}
	</div>
</a>

<style scoped>
.card {
	display: block;
	text-decoration: none;
	color: inherit;
	width: 100%;
	max-width: 336px;
	border-radius: 70px;
	overflow: hidden; /* clips everything */
	background: #0c0c0c; /* fills edges */
	transition: transform 2620ms ease, box-shadow 10ms ease;
}

.card:hover {
	transform: translateY(-6px) scale(1.08);
	box-shadow: 0 2px 6px rgba(29, 29, 29, 0.61);
	z-index: 10;
}

.image-wrapper {
	position: relative;
	width: 100%;
	aspect-ratio: 7 / 2;
		
}

.image-wrapper img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	display: block;
	transition: transform 4330ms cubic-bezier(.2,.8,.2,1);
}

.card:hover .image-wrapper img {
	transform: scale(1.08);
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
	color: #fff;
	text-shadow: 0 2px 6px rgba(0,0,0,0.6);
}

.overlay {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: flex-end;
	padding: 0.2rem;
	pointer-events: none;
}

.tag-badge {
	font-size: 1.4rem;
	font-weight: 800;
	color: #fff;
	text-shadow:
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
	transition: transform 240ms ease, text-shadow 240ms ease;
}

.card:hover .tag-badge {
	transform: translateY(-4px) scale(1.05);
	text-shadow: 0 0 4px rgba(0,0,0,0.4);
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
	pointer-events: none;
}
</style>