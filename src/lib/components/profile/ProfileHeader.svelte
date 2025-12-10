<script>
	let { user, showEditButton = false } = $props()
</script>

<div class="profile-header">
	<div class="avatar">
		{user.username.charAt(0).toUpperCase()}
	</div>

	<div class="user-info">
		<h1>{user.username}</h1>

		{#if user.bio}
			<p class="bio">{user.bio}</p>
		{/if}

		<div class="meta">
			{#if user.age}
				<span>🎂 Age: {user.age}</span>
			{/if}
			{#if user.gender}
				<span>⚧ {user.gender}</span>
			{/if}
		</div>
	</div>

	{#if showEditButton}
		<div>
			<a class="edit-profile-button" href="/profile/edit">Edit Profile</a>
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
