<script>
	import { language, t } from '$lib/i18n'

	let { tag } = $props()

	const tagName = $derived(typeof tag === 'string' ? tag : (tag?.tag ?? tag?.name ?? ''))
	const fileUrl = $derived(tag?.file_url ?? tag?.image_url ?? null)
	const usageCount = $derived(
		typeof tag === 'object' && tag?.usage_count ? Number(tag.usage_count) : null
	)

	const href = $derived(tagName ? `/explore?tag=${encodeURIComponent(tagName)}` : '/explore')
	const postCountLabel = $derived.by(() => {
		if (!usageCount) return ''
		if ($language === 'en') {
			return usageCount === 1 ? t($language, 'postSingular') : t($language, 'postPlural')
		}
		return t($language, 'postPlural')
	})
</script>

<a
	{href}
	class="card"
	aria-label={tagName ? t($language, 'exploreTagAria', { tag: tagName }) : t($language, 'exploreAria')}
>
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
			<span class="post-count">{usageCount} {postCountLabel}</span>
		{/if}
	</div>
</a>

<style scoped>
/* CARD — outer shell only */
.card {
	display: block;
	width: 90%;
	max-width: 276px;
	text-decoration: none;
	color: inherit;

	background:  #000000ef;
	transition: transform 260ms ease, box-shadow 260ms ease;
}

.card:hover {
	transform: translateY(-4px) scale(1.05);
	box-shadow: 0 10px 28px rgb(0, 0, 0);
	z-index: 10;
}

/* IMAGE WRAPPER — THIS DEFINES THE SHAPE */
.image-wrapper {
	position: relative;
	width: 100%;
	aspect-ratio: 7 / 2;

	border-radius: 32px;      /* 🔥 actual rounding */
	overflow: hidden;         /* 🔥 hard clip */
}

/* IMAGE — MATCH THE SHAPE */
.image-wrapper img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	display: block;

	border-radius: 32px;      /* 🔥 same radius as wrapper */
	transform: scale(1.02);
	transition: transform 360ms cubic-bezier(.2,.8,.2,1);
}

.card:hover .image-wrapper img {
	transform: scale(1.06);
}

/* PLACEHOLDER — ALSO ROUNDED */
.image-placeholder {
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;

	border-radius: 32px;
	background: linear-gradient(135deg, #ffb84d 0%, #ff914d 100%);
}

.placeholder-text {
	font-size: 2rem;
	font-weight: 800;
	color: #fff;
	text-shadow: 0 2px 6px rgba(0,0,0,0.6);
}

/* OVERLAY TEXT */
.overlay {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: flex-end;
	padding: 0.6rem;
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
	transition: transform 240ms ease;
}

.card:hover .tag-badge {
	transform: translateY(-4px) scale(1.05);
}

/* POST COUNT */
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
