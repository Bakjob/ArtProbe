<script>
	import { goto } from '$app/navigation'
	import { language, t } from '$lib/i18n'

	let username = ''
	let email = ''
	let password = ''
	let confirmPassword = ''
	let error = ''
	let loading = false

	async function handleSubmit(event) {
		event.preventDefault()
		error = ''

		if (password !== confirmPassword) {
			error = t($language, 'passwordMismatch')
			return
		}

		loading = true

		try {
			const response = await fetch('/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, email, password })
			})

			const data = await response.json()

			if (!response.ok) {
				error = data.error || t($language, 'registrationFailed')
				return
			}

			// Success - redirect to explore
			window.location.href = '/explore'
		} catch (err) {
			error = t($language, 'networkError')
		} finally {
			loading = false
		}
	}
</script>

<div class="register-container">
	<h1>{t($language, 'registerTitle')}</h1>

	{#if error}
		<div class="error">{error}</div>
	{/if}

	<form on:submit={handleSubmit}>
		<label for="username">{t($language, 'username')}:</label>
		<input type="text" id="username" bind:value={username} required />

		<label for="email">{t($language, 'email')}:</label>
		<input type="email" id="email" bind:value={email} required />

		<label for="password">{t($language, 'password')}:</label>
		<input type="password" id="password" bind:value={password} required />

		<label for="confirm_password">{t($language, 'confirmPassword')}:</label>
		<input type="password" id="confirm_password" bind:value={confirmPassword} required />

		<button type="submit" disabled={loading}>
			{loading ? t($language, 'registering') : t($language, 'registerTitle')}
		</button>
	</form>
	<p>
		{t($language, 'alreadyHaveAccount')} <a href="/auth/login">{t($language, 'loginHere')}</a>.
	</p>
</div>

<style scoped>
	.register-container {
		max-width: 400px;
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

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	input {
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
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

	button:hover {
		background-color: #005bb5;
	}
	p {
		text-align: center;
		margin-top: 1rem;
	}
	a {
		color: #0070f3;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}

	.error {
		background-color: #fee;
		color: #c33;
		padding: 0.75rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		border: 1px solid #fcc;
	}

	button:disabled {
		background-color: #999;
		cursor: not-allowed;
	}
</style>
