<script lang="ts">
	let { ad } = $props()

	// Use a derived value so we always fall back to the placeholder when image is missing/empty
	let imageSrc = $derived(ad?.image?.trim() || '/placeholder.png')

	function onImgError(e: Event) {
		const img = e.currentTarget as HTMLImageElement
		if (img && img.src && !img.src.endsWith('/placeholder.png')) {
			img.src = '/placeholder.png'
		}
	}
</script>

<div class="card">
	<img src={imageSrc} alt={ad.title} onerror={onImgError} />
	<h2>{ad.title}</h2>
	<p id="description">{ad.description}</p>
	<p id="author">{ad.author}</p>
	<p id="price">{ad.price}</p>
</div>
<style scoped>

	img {
		max-width: 100%;
		height: auto;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.25rem;
		margin: 0.5rem 0;
	}

	#description {
		font-size: 1rem;
		color: #555;
		margin: 0.5rem 0;
	}

	#author {
		font-size: 0.9rem;
		color: #888;
		margin: 0.5rem 0;
	}

	#price {
		font-size: 1rem;
		font-weight: bold;
		color: #000;
		margin: 0.5rem 0;
	}
</style>