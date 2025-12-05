<script lang="ts">
	let { ad } = $props()

	let imageSrc = $derived(ad.image?.trim() || '/placeholder.png')
</script>

<div class="card-container">
	<h2>{ad.title}</h2>
	<p>{ad.description}</p>
	<img src={imageSrc} alt={ad.title} />
</div>

<style scoped>
	.card-container {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 1rem;
		text-align: center;
	}

	.card-container img {
		max-width: 100%;
		border-radius: 4px;
	}

	.card-container h2 {
		margin: 0.5rem 0;
	}

	.card-container p {
		color: #666;
	}
</style>
