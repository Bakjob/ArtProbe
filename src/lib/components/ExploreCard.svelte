<script lang="ts">
	let {
		ad
	}: {
		ad: {
			title: string
			image: string
			description: string
			author: string
			price: string
		}
	} = $props()

	let imageSrc = $derived(ad?.image?.trim() || '/placeholder.png')

	function onImgError(e: Event) {
		const img = e.currentTarget as HTMLImageElement
		if (img && !img.src.endsWith('/placeholder.png')) {
			img.src = '/placeholder.png'
		}
	}
</script>

<div class="card">
	<div class="image-container" aria-hidden={!imageSrc}>
		<img src={imageSrc} alt={ad.title} onerror={onImgError} loading="lazy" />
	</div>

	<h2 class="title">{ad.title}</h2>
	<p class="description">{ad.description}</p>
	<p class="author">{ad.author}</p>
	<p class="price">{ad.price}</p>
</div>

<style>
	.card {
		display: grid;
		grid-template-rows: auto 1fr;
		text-align: center;
		transition: --card 0.3s ease;
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

	/* Hover: reveal more of the image by increasing container max-height.
     This pushes the following text down because the image container participates in layout. */
	.card:hover .image-container {
		max-height: 420px; /* expanded height — tweak as needed */
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	}

	/* Compress text spacing while image grows to create "giving space" effect */
	.title,
	.description,
	.author,
	.price {
		margin: 0.5rem 0;
		transition:
			margin 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
			color 200ms;
	}

	.card:hover .title,
	.card:hover .description,
	.card:hover .author,
	.card:hover .price {
		margin: 0.25rem 0;
	}

	.title {
		font-size: 1.25rem;
		margin-top: 0.25rem;
	}

	.description {
		font-size: 1rem;
		color: #555;
	}

	.author {
		font-size: 0.9rem;
		color: #888;
	}

	.price {
		font-size: 1rem;
		font-weight: bold;
		color: #000;
	}
</style>
