<script>
	let password = ''
	let confirmPassword = ''
	function validateForm() {
		if (password !== confirmPassword) {
			alert('Passwords do not match!')
			return false
		}
		return true
	}
</script>

<div class="register-container">
	<h1>Register</h1>
	<form method="POST" action="/auth/register" on:submit|preventDefault={validateForm}>
		<label for="username">Username:</label>
		<input type="text" id="username" name="username" required />

		<label for="email">Email:</label>
		<input type="email" id="email" name="email" required />

		<label for="password">Password:</label>
		<input type="password" id="password" name="password" required />

		<label for="confirm_password">Confirm Password:</label>
		<input type="password" id="confirm_password" name="confirm_password" required />

		<button type="submit">Register</button>
	</form>
	<p>Already have an account? <a href="/auth/login">Login here</a>.</p>
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
</style>
