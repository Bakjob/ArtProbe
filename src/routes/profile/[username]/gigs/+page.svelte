<script>
    import InfoCard from '$lib/components/profile/InfoCard.svelte'

    let { data } = $props()
</script>

<div class="gigs-page">
    <div class="page-header">
        <h2>{data.profile?.username || 'User'}'s Gigs</h2>

        {#if data.canEditProfile}
            <a class="create-gig-button" href={`/profile/${data.profile?.username}/gigs/create`}>Create gig</a>
        {/if}
    </div>

    {#if (data.gigs?.length || 0) === 0}
        <p>This user has no gigs listed.</p>
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