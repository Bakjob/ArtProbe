<script>
	import { goto } from '$app/navigation'
	import { enhance } from '$app/forms'

	let { data } = $props()

	let title = $state('')
	let description = $state('')
	let tags = $state([])
	let tagInput = $state('')
	let isSubmitting = $state(false)
	let errorMessage = $state('')
	let imageInput
	let existingTags = $derived(data.tags || [])
	let showSuggestions = $state(false)
	let selectedSuggestionIndex = $state(-1)

	const filteredTags = $derived(
		tagInput.trim().length > 0
			? existingTags.filter(
					(tag) => tag.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag)
				)
			: []
	)

	function addTag(tag) {
		const trimmedTag = tag.trim()
		if (trimmedTag.length > 0 && !tags.includes(trimmedTag)) {
			tags = [...tags, trimmedTag]
		}
		tagInput = ''
		showSuggestions = false
		selectedSuggestionIndex = -1
	}

	function removeTag(tag) {
		tags = tags.filter((t) => t !== tag)
	}

	function handleTagInput(e) {
		const value = e.target.value
		showSuggestions = value.trim().length > 0
		const lastChar = value[value.length - 1]

		// Check if user pressed comma or space
		if (lastChar === ',' || lastChar === ' ') {
			const newTag = value.slice(0, -1).trim()
			addTag(newTag)
			e.target.value = ''
		}
	}

	function handleTagKeydown(e) {
		// Handle arrow keys for suggestion navigation
		if (showSuggestions && filteredTags.length > 0) {
			if (e.key === 'ArrowDown') {
				e.preventDefault()
				selectedSuggestionIndex = (selectedSuggestionIndex + 1) % filteredTags.length
				return
			} else if (e.key === 'ArrowUp') {
				e.preventDefault()
				selectedSuggestionIndex =
					selectedSuggestionIndex <= 0 ? filteredTags.length - 1 : selectedSuggestionIndex - 1
				return
			} else if (e.key === 'Escape') {
				e.preventDefault()
				showSuggestions = false
				selectedSuggestionIndex = -1
				return
			}
		}

		// Handle backspace when input is empty - remove last tag
		if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
			tags = tags.slice(0, -1)
		}
		// Handle Enter key
		else if (e.key === 'Enter') {
			e.preventDefault()
			if (
				showSuggestions &&
				selectedSuggestionIndex >= 0 &&
				filteredTags[selectedSuggestionIndex]
			) {
				addTag(filteredTags[selectedSuggestionIndex])
			} else {
				addTag(tagInput)
			}
		}
	}
</script>

<div class="container">
	<div class="card">
		<h1>🎨 Create New Post</h1>
		<p class="subtitle">Share your artwork with the community</p>

		<form
			method="POST"
			action="?/create"
			enctype="multipart/form-data"
			use:enhance={() => {
				isSubmitting = true
				return async ({ result, update }) => {
					isSubmitting = false
					if (result.type === 'redirect') {
						goto(result.location)
					} else if (result.type === 'failure') {
						errorMessage = result.data?.message || 'Failed to create post'
					}
					await update()
				}
			}}
		>
			<div class="form-group">
				<label for="image">Upload Image</label>
				<input
					type="file"
					id="image"
					name="image"
					accept="image/*"
					bind:this={imageInput}
					required
				/>
			</div>

			<div class="form-group">
				<label for="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					bind:value={title}
					placeholder="Enter a catchy title..."
					required
				/>
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<textarea
					id="description"
					name="description"
					bind:value={description}
					placeholder="Tell us about your artwork..."
					required
				></textarea>
			</div>

			<!-- Hidden input for tags -->
			<input type="hidden" name="tags" value={JSON.stringify(tags)} />

			<div class="form-group">
				<label for="tags">Tags</label>
				<div class="tags-container">
					<div class="tags-input-wrapper">
						{#each tags as tag}
							<span class="tag-pill">
								{tag}
								<button
									type="button"
									class="tag-remove"
									onclick={() => removeTag(tag)}
									aria-label="Remove tag"
								>
									×
								</button>
							</span>
						{/each}
						<input
							type="text"
							id="tags"
							class="tag-input"
							bind:value={tagInput}
							oninput={handleTagInput}
							onkeydown={handleTagKeydown}
							onfocus={() => (showSuggestions = tagInput.trim().length > 0)}
							onblur={() => setTimeout(() => (showSuggestions = false), 200)}
							placeholder={tags.length === 0 ? 'Type tags and press space or comma...' : ''}
							autocomplete="off"
						/>
					</div>

					{#if showSuggestions && filteredTags.length > 0}
						<div class="suggestions-dropdown">
							{#each filteredTags.slice(0, 10) as tag, index}
								<button
									type="button"
									class="suggestion-item"
									class:selected={index === selectedSuggestionIndex}
									onclick={() => addTag(tag)}
								>
									{tag}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<small class="hint"
					>Press Space, Comma, or Enter to add a tag. Use ↑↓ to navigate suggestions.</small
				>
			</div>

			<button type="submit" disabled={isSubmitting} class="submit-btn">
				{#if isSubmitting}
					⏳ Creating...
				{:else}
					✨ Create Post
				{/if}
			</button>

			{#if errorMessage}
				<p class="error">⚠️ {errorMessage}</p>
			{/if}
		</form>
	</div>
</div>

<style>
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
		background: linear-gradient(90deg, #ffde59, #ff914d);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		margin: 0 0 2rem 0;
		color: #666;
		font-size: 1rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #333;
	}

	input[type='text']:not(.tag-input),
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		font-family: inherit;
		font-size: 1rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		background: white;
	}

	input[type='text']:not(.tag-input):focus,
	textarea:focus {
		outline: none;
		border-color: #ff914d;
		box-shadow: 0 0 0 3px rgba(255, 145, 77, 0.1);
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	input[type='file'] {
		padding: 0.5rem;
		border: 2px dashed #ddd;
		border-radius: 8px;
		cursor: pointer;
		transition: border-color 0.2s;
	}

	input[type='file']:hover {
		border-color: #ff914d;
	}

	.tags-container {
		position: relative;
	}

	.tags-input-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.75rem;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		background: white;
		min-height: 48px;
		align-items: center;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.tags-input-wrapper:focus-within {
		border-color: #ff914d;
		box-shadow: 0 0 0 3px rgba(255, 145, 77, 0.1);
	}

	.tag-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.4rem 0.75rem;
		background: linear-gradient(90deg, #ffde59, #ff914d);
		color: #1e1e1e;
		border-radius: 16px;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.tag-remove {
		background: none;
		border: none;
		color: #1e1e1e;
		font-size: 1.2rem;
		line-height: 1;
		cursor: pointer;
		padding: 0;
		margin: 0;
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background 0.2s;
	}

	.tag-remove:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	.tag-input {
		flex: 1;
		min-width: 150px;
		border: none;
		outline: none;
		font-family: inherit;
		font-size: 1rem;
		padding: 0;
		background: transparent;
	}

	.suggestions-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		background: white;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		max-height: 200px;
		overflow-y: auto;
		z-index: 100;
	}

	.suggestion-item {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		border: none;
		background: white;
		text-align: left;
		cursor: pointer;
		transition: background 0.2s;
		font-family: inherit;
		font-size: 1rem;
	}

	.suggestion-item:hover,
	.suggestion-item.selected {
		background: linear-gradient(90deg, rgba(255, 222, 89, 0.3), rgba(255, 145, 77, 0.3));
	}

	.hint {
		display: block;
		margin-top: 0.5rem;
		color: #666;
		font-size: 0.85rem;
	}

	.submit-btn {
		margin-top: 1rem;
		padding: 1rem 2rem;
		font-size: 1.1rem;
		font-weight: bold;
		background: linear-gradient(90deg, #ffde59, #ff914d);
		color: #1e1e1e;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		text-shadow: none;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 145, 77, 0.4);
	}

	.submit-btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.error {
		color: #d32f2f;
		background: #ffebee;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		border-left: 4px solid #d32f2f;
		margin: 0;
		text-shadow: none;
	}
</style>
