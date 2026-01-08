<script>
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'

	let { data, form } = $props()

	let isSubmitting = $state(false)
	let errorMessage = $state('')
</script>

<div class="container">
	<div class="card">
		<h1>Create gig</h1>
		<p class="subtitle">Create a new gig for {data.profile?.username}</p>

		<form
			method="POST"
			use:enhance={() => {
				isSubmitting = true
				errorMessage = ''
				return async ({ result }) => {
					isSubmitting = false
					if (result.type === 'redirect') {
						goto(result.location)
					} else if (result.type === 'failure') {
						errorMessage = result.data?.message || 'Failed to create gig'
					}
				}
			}}
		>
			<div class="form-group">
				<label for="title">Gig title</label>
				<input id="title" name="title" type="text" required />
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<textarea id="description" name="description" rows="5" required></textarea>
			</div>

			<div class="form-group">
				<label for="delivery_days">Delivery days</label>
				<input id="delivery_days" name="delivery_days" type="number" min="1" required />
			</div>

            <div class="form-group">
                <label for="tags">Tags</label>
                <input id="tags" name="tags" type="text" required />
            </div>

			<button class="submit" type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Creating…' : 'Create gig'}
			</button>

			{#if errorMessage}
				<p class="error">{errorMessage}</p>
			{/if}
		</form>
	</div>
</div>

<style scoped>
	.container {
		max-width: 700px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.card {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	}

	h1 {
		margin: 0 0 0.5rem 0;
		font-size: 2rem;
	}

	.subtitle {
		margin: 0 0 1.5rem 0;
		color: #666;
	}

	.form-group {
		display: grid;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	label {
		font-weight: 600;
	}

	input,
	textarea {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 10px;
		font-size: 1rem;
	}

	.submit {
		width: 100%;
		padding: 0.8rem 1rem;
		background-color: #3b82f6;
		color: white;
		border: none;
		border-radius: 10px;
		font-weight: 700;
		cursor: pointer;
	}

	.submit:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.error {
		margin-top: 1rem;
		color: #b91c1c;
	}
</style>