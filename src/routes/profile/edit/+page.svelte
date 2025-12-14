<script>
	let { data, form } = $props()

	let gender = $state('')
	let bio = $state('')
	let age = $state('')
	let phone = $state('')

	$effect(() => {
		gender = data.user?.gender || ''
		bio = data.user?.bio || ''
		age = data.user?.age || ''
		phone = data.user?.phone || ''
	})

	$effect(() => {
		if (form?.success) {
			// Show success message
		}
	})
</script>

<div class="profile-container">
	<h1>Edit Profile</h1>

	<div class="user-info">
		<p><strong>Username:</strong> {data.user?.username}</p>
		<p><strong>Email:</strong> {data.user?.email}</p>
	</div>

	{#if form && !form.success}
		<div class="error">{form.error}</div>
	{/if}

	{#if form?.success}
		<div class="success">Profile updated successfully!</div>
	{/if}

	<form method="POST" action="?/update">
		<label for="age">Age:</label>
		<input type="number" id="age" name="age" value={age} min="1" max="120" />

		<label for="gender">Gender:</label>
		<input
			type="text"
			id="gender"
			name="gender"
			value={gender}
			placeholder="e.g. Male, Female, mental illness"
		/>

		<label for="phone">Phone:</label>
		<input type="tel" id="phone" name="phone" value={phone} placeholder="+1234567890" />

		<label for="bio">Bio:</label>
		<textarea id="bio" name="bio" rows="5" placeholder="Tell us about yourself...">{bio}</textarea>

		<button type="submit">Save Profile</button>
	</form>

	<div class="danger-zone">
		<h3>Danger Zone</h3>
		<p>Once you delete your profile, there is no going back. Please be certain.</p>
		<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Are you sure you want to delete your profile? This action cannot be undone.')) e.preventDefault(); }}>
			<button type="submit" class="delete-button">Delete Profile</button>
		</form>
	</div>
</div>

<style>
	.profile-container {
		max-width: 600px;
		margin: 2rem auto;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #f9f9f9;
	}

	h1 {
		text-align: center;
		margin-bottom: 1rem;
	}

	.user-info {
		background-color: #e9ecef;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1.5rem;
	}

	.user-info p {
		margin: 0.5rem 0;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	input,
	textarea {
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-family: inherit;
	}

	textarea {
		resize: vertical;
	}

	button {
		margin-top: 1.5rem;
		padding: 0.75rem;
		font-size: 1rem;
		background-color: #0070f3;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		background-color: #005bb5;
	}

	button:disabled {
		background-color: #999;
		cursor: not-allowed;
	}
	.danger-zone {
		margin-top: 3rem;
		padding: 1.5rem;
		border: 2px solid #dc3545;
		border-radius: 8px;
		background-color: #fff5f5;
	}

	.danger-zone h3 {
		color: #dc3545;
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
	}

	.danger-zone p {
		color: #666;
		font-size: 0.9rem;
		margin: 0 0 1rem 0;
	}

	.danger-zone form {
		margin: 0;
	}

	.delete-button {
		background-color: #dc3545;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		margin-top: 0;
	}

	.delete-button:hover {
		background-color: #c82333;
	}

	.delete-button:hover {
		background-color: #c82333;
	}

	.error {
		background-color: #fee;
		color: #c33;
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		border: 1px solid #fcc;
	}

	.success {
		background-color: #efe;
		color: #3c3;
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		border: 1px solid #cfc;
	}
</style>
