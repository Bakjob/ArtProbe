<script>
	import InfoCard from '$lib/components/profile/InfoCard.svelte'
	import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte'

	let { data } = $props()
	$effect(() => {
		console.log('Profile data:', data)
	})
</script>

<div class="background-image"><img src={data.profile?.background_url} alt="Background" /></div>

<div class="profile-page">
	<div class="header">
		<ProfileHeader
			user={data.profile}
			gigs={data.profile?.gigs}
			posts={data.profile?.posts}
			gender={data.profile?.gender}
			age={data.profile?.age}
			createdAt={data.profile?.created_at}
			showEditButton={data.canEditProfile}
			avatarUrl={data.profile?.avatar_url}
		/>
	</div>

	{#if data.canEditProfile}
		<!-- Lägg ägar-specifika saker här -->
	{/if}

	<div class="cards-grid">
		<!-- 		<InfoCard
			color="#f9f9f9"
			text="gigs"
			href={`/profile/${data.profile.username}/gigs`}
			symbol="/placeholder.png"
			onError={(e) => console.log('InfoCard error', e)}
		/> -->
		<!-- 		<InfoCard
			color="#f9f9f9"
			text="orders"
			href={`/profile/${data.profile.username}/orders`}
			symbol="/placeholder.png"
			onError={(e) => console.log('InfoCard error', e)}
		/> -->
		<!-- 		<InfoCard
			color="#f9f9f9"
			text="reviews"
			href={`/profile/${data.profile.username}/reviews`}
			symbol="/placeholder.png"
			onError={(e) => console.log('InfoCard error', e)}
		/> -->
		<!-- <InfoCard
			color="#f9f9f9"
			text="wallet"
			href={`/profile/${data.profile.username}/wallet`}
			symbol="/placeholder.png"
			onError={(e) => console.log('InfoCard error', e)}
		/> -->
		<!-- 		<InfoCard
			color="#f9f9f9"
			text="stats"
			href={`/profile/${data.profile.username}/stats`}
			symbol="/placeholder.png"
			onError={(e) => console.log('InfoCard error', e)}
		/> -->
		<InfoCard
			color="#f9f9f9"
			text="badges"
			href={`/profile/${data.profile.username}/badges`}
			symbol="/placeholder.png"
			onError={(e) => console.log('InfoCard error', e)}
		/>
	</div>
</div>

<style>
	.profile-page {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.header {
		width: 100%;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, auto);
		gap: 1.5rem;
		align-items: start;
	}

	.background-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.background-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
