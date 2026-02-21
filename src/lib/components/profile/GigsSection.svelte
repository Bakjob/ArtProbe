<script>
	import { language, t } from '$lib/i18n'

	let { gigs } = $props()
</script>

{#if gigs.length > 0}
	<section class="section">
		<h2>📦 {t($language, 'gigsLabel')}</h2>
		<div class="gigs-list">
			{#each gigs as gig}
				<div class="gig-card">
					<h3>{gig.title}</h3>
					<p class="description">{gig.description}</p>
					<div class="gig-meta">
						<span>{t($language, 'deliveryDaysLabel', { days: gig.delivery_days })}</span>
					</div>
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

	.gigs-list {
		display: grid;
		gap: 1rem;
	}

	.gig-card {
		background: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 1.2rem;
		transition: transform 0.2s;
		cursor: pointer;
	}

	.gig-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.gig-card h3 {
		margin: 0 0 0.5rem 0;
		color: #1e293b;
	}

	.description {
		color: #666;
		margin: 0.5rem 0;
		line-height: 1.5;
	}

	.gig-meta {
		margin-top: 1rem;
		color: #666;
		font-size: 0.9rem;
		display: flex;
		gap: 1rem;
	}
</style>
