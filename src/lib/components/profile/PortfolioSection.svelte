<script>
	let { portfolio } = $props()
</script>

{#if portfolio.length > 0}
	<section class="section">
		<h2>🎨 Portfolio</h2>
		<div class="portfolio-grid">
			{#each portfolio as item}
				<div class="portfolio-item">
					<img src={item.file_url} alt={item.title || 'Portfolio item'} loading="lazy" />
					{#if item.title}
						<p class="portfolio-title">{item.title}</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.section {
		margin-bottom: 2rem;
	}

	h2 {
		margin-bottom: 1rem;
		border-bottom: 2px solid #3b82f6;
		padding-bottom: 0.5rem;
	}

	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.portfolio-item {
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid #ddd;
		transition: transform 0.2s;
		cursor: pointer;
	}

	.portfolio-item:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.portfolio-item img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
	}

	.portfolio-title {
		padding: 0.5rem;
		background: white;
		margin: 0;
		font-size: 0.9rem;
		text-align: center;
	}
</style>
