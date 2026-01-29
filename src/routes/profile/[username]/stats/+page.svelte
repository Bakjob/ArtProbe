<script>
	import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte'
	import ProfileStats from '$lib/components/profile/ProfileStats.svelte'
	import LanguagesSection from '$lib/components/profile/LanguagesSection.svelte'
	import SkillsSection from '$lib/components/profile/SkillsSection.svelte'
	import PortfolioSection from '$lib/components/profile/PortfolioSection.svelte'
	import GigsSection from '$lib/components/profile/GigsSection.svelte'

	let { data } = $props()
</script>

<div>
	<ProfileHeader user={data.user} showEditButton={true} />
	<ProfileStats user={data.user} />
	<LanguagesSection languages={data.languages} />
	<SkillsSection skills={data.skills} />
	<PortfolioSection portfolio={data.portfolio} />
	<GigsSection gigs={data.gigs} />
</div>

<style scoped></style>
