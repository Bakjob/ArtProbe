<script>
	import { language, t } from '$lib/i18n'

	let {
		user = null,
		gigs = undefined,
		posts = undefined,
		gender = undefined,
		age = undefined,
		createdAt = undefined,
		showEditButton = false,
		avatarUrl = undefined
	} = $props()

	function asOptionalString(value) {
		return typeof value === 'string' ? value : undefined
	}

	function asOptionalNumber(value) {
		return typeof value === 'number' && Number.isFinite(value) ? value : undefined
	}

	function asOptionalDate(value) {
		if (!value) return undefined
		const d = value instanceof Date ? value : new Date(value)
		return Number.isNaN(d.getTime()) ? undefined : d
	}

	let username = $derived(asOptionalString(user?.username) ?? '')
	let avatarLetter = $derived(username ? username.charAt(0).toUpperCase() : '?')
	let resolvedBio = $derived(asOptionalString(user?.bio) ?? '')

	let resolvedAge = $derived(age != null ? asOptionalNumber(age) : asOptionalNumber(user?.age))
	let resolvedGender = $derived(
		gender != null ? asOptionalString(gender) : asOptionalString(user?.gender)
	)
	let resolvedCreatedAt = $derived(
		asOptionalDate(createdAt) ?? asOptionalDate(user?.created_at) ?? asOptionalDate(user?.createdAt)
	)

	let gigsCount = $derived(
		Array.isArray(gigs) ? gigs.length : Array.isArray(user?.gigs) ? user.gigs.length : undefined
	)
	let postsCount = $derived(
		Array.isArray(posts) ? posts.length : Array.isArray(user?.posts) ? user.posts.length : undefined
	)

	let resolvedAvatarUrl = $derived(avatarUrl ?? user?.avatar_url ?? null)
</script>

<div class="profile-header">
	<div class="avatar">
		{#if resolvedAvatarUrl}
			<img src={resolvedAvatarUrl} alt={t($language, 'avatarAlt', { username })} />
		{:else}
			{avatarLetter}
		{/if}
	</div>

	<div class="user-info">
	<h1>{username || t($language, 'unknownUser')}</h1>

		{#if resolvedBio}
			<p class="bio">{resolvedBio}</p>
		{/if}

		<div class="meta">
			{#if resolvedAge != null}
				<span>🎂 {t($language, 'age')}: {resolvedAge}</span>
			{/if}
			{#if resolvedGender}
				<span>⚧ {t($language, 'gender')}: {resolvedGender}</span>
			{/if}
			{#if resolvedCreatedAt}
				<span>
					📅 {t($language, 'joined')}:
					{resolvedCreatedAt.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })}
				</span>
			{/if}
			{#if gigsCount != null}
				<span>🛠️ {t($language, 'gigsLabel')}: {gigsCount}</span>
			{/if}
			{#if postsCount != null}
				<span>🖼️ {t($language, 'postsLabel')}: {postsCount}</span>
			{/if}
		</div>
	</div>

	{#if showEditButton}
		<div>
			<a class="edit-profile-button" href="/profile/edit">{t($language, 'editProfile')}</a>
		</div>
	{/if}
</div>

<style>
	.profile-header {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 2rem;
		background: #f9f9f9;
		border-radius: 12px;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: #3b82f6;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		font-weight: bold;
		flex-shrink: 0;
		overflow: hidden;
		border: 3px solid white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-info h1 {
		margin: 0 0 1rem 0;
	}

	.bio {
		color: #666;
		margin: 0.5rem 0;
	}

	.meta {
		display: flex;
		gap: 1rem;
		color: #666;
		font-size: 0.9rem;
	}

	.edit-profile-button {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #3b82f6;
		color: white;
		border-radius: 6px;
		text-decoration: none;
		font-weight: bold;
	}

	.edit-profile-button:hover {
		background-color: #2563eb;
	}
</style>
