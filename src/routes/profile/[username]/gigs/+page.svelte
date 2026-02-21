<script>
	import InfoCard from '$lib/components/profile/InfoCard.svelte'
	import { language, t } from '$lib/i18n'

	let { data } = $props()
</script>

<div class="gigs-page">
	<div class="page-header">
		<h2>
			{t($language, 'userGigsTitle', {
				username: data.profile?.username || t($language, 'unknownUser')
			})}
		</h2>

		{#if data.canEditProfile}
			<a class="create-gig-button" href={`/profile/${data.profile?.username}/gigs/create`}>
				{t($language, 'createGig')}
			</a>
		{/if}
	</div>

	{#if (data.gigs?.length || 0) === 0}
		<p>{t($language, 'noGigsListed')}</p>
		<h2>{t($language, 'featureNotImplemented')}</h2>
	{:else}
		<div class="gigs-grid">
			{#each data.gigs as gig}
				<InfoCard
					color="#e0f7fa"
					text={gig.title}
					href={`/profile/${data.profile?.username}/gigs/${gig.gig_id}`}
					symbol="/placeholder.png"
					onError={(e) => console.log('InfoCard error', e)}
				/>
			{/each}
		</div>
	{/if}
</div>

<style scoped>
	.gigs-page {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.gigs-page h2 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.page-header h2 {
		margin: 0;
	}

	.create-gig-button {
		display: inline-block;
		padding: 0.6rem 1rem;
		background-color: #3b82f6;
		color: white;
		border-radius: 6px;
		text-decoration: none;
		font-weight: bold;
		white-space: nowrap;
	}

	.create-gig-button:hover {
		background-color: #2563eb;
	}

	.gigs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
	}
</style>
