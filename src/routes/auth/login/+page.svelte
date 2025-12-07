<div class="login-container">
	<h1>Login</h1>
	<p>Please enter your credentials to log in.</p>
	<form method="POST" action="/auth/login">
		<label for="username">Username:</label>
		<input type="text" id="username" name="username" required />

		<label for="password">Password:</label>
		<input type="password" id="password" name="password" required />

		<button type="submit">Login</button>
	</form>
	<p>Don't have an account? <a href="/auth/register">Register here</a>.</p>
</div>

<style scoped>
	.login-container {
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
</style>
