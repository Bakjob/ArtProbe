<script>
	import ExploreCard from '$lib/components/explore/ExploreCard.svelte'

	let { data } = $props()
	let posts = $derived(data.posts)
	let activeTags = $derived(data.tags || [])
	let allTags = $derived(data.allTags || [])
	let searchQuery = $derived(data.search || '')
	let showMature = $derived(data.showMature || false)

	// Build URL with current filters
	function buildUrl(options = {}) {
		const params = new URLSearchParams()
		
		// Tags
		const tagsToUse = options.tags !== undefined ? options.tags : activeTags
		tagsToUse.forEach(tag => params.append('tag', tag))
		
		// Search
		const searchToUse = options.search !== undefined ? options.search : searchQuery
		if (searchToUse) params.set('search', searchToUse)
		
		// Mature content
		const matureToUse = options.mature !== undefined ? options.mature : showMature
		if (matureToUse) params.set('mature', 'true')
		
		const queryString = params.toString()
		return queryString ? `/explore?${queryString}` : '/explore'
	}

	// Build URL without a specific tag
	function removeTagUrl(tagToRemove) {
		const remaining = activeTags.filter((t) => t !== tagToRemove)
		return buildUrl({ tags: remaining })
	}

	// Build URL with an additional tag
	function addTagUrl(tagToAdd) {
		const tagLower = tagToAdd.toLowerCase()
		if (activeTags.includes(tagLower)) return null // Already active
		const newTags = [...activeTags, tagLower]
		return buildUrl({ tags: newTags })
	}

	// Handle search
	function handleSearch(event) {
		event.preventDefault()
		window.location.href = buildUrl({ search: searchQuery })
	}

	// Toggle mature content
	function toggleMature() {
		window.location.href = buildUrl({ mature: !showMature })
	}
</script>

<div class="explore-container">
	<h1>Explore</h1>

	<div class="search-bar">
		<form onsubmit={handleSearch}>
			<input 
				type="text" 
				placeholder="Sök på titel eller artist..." 
				bind:value={searchQuery}
			/>
			<button type="submit" aria-label="Search">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.35-4.35"></path>
				</svg>
			</button>
		</form>
		
		<button class="mature-toggle" class:active={showMature} onclick={toggleMature}>
			{showMature ? '🔓 Visa allt' : '🔒 Dölj NSFW'}
		</button>
	</div>

	{#if data.search}
		<div class="active-search">
			Söker efter: <strong>{data.search}</strong>
			<a href={buildUrl({ search: '' })} class="clear-search">×</a>
		</div>
	{/if}

	{#if allTags.length > 0}
		<div class="popular-tags">
			<span class="popular-label">Popular:</span>
			{#each allTags as tagObj (tagObj.tag)}
				{@const isActive = activeTags.includes(tagObj.tag.toLowerCase())}
				{@const url = isActive ? removeTagUrl(tagObj.tag.toLowerCase()) : addTagUrl(tagObj.tag)}
				<a
					href={url}
					class="popular-tag"
					class:active={isActive}
					title={isActive ? 'Remove filter' : `Filter by #${tagObj.tag}`}
				>
					#{tagObj.tag}
					<span class="tag-count">{tagObj.usage_count}</span>
				</a>
			{/each}
		</div>
	{/if}

	<div class="filter-bar">Filter by tags and discover new artworks</div>
	{#if activeTags.length > 0}
		<div class="tag-filter">
			<span>Filtering by:</span>
			{#each activeTags as tag (tag)}
				<a href={removeTagUrl(tag)} class="tag-badge" title="Remove tag">
					#{tag} <span class="remove-x">×</span>
				</a>
			{/each}
			<a href={buildUrl({ tags: [] })} class="clear-btn">Clear all</a>
		</div>
	{:else}
		<p>Discover amazing artworks from our community</p>
	{/if}

	<div class="card-grid">
		{#each posts as post (post.post_id)}
			<ExploreCard {post} user={data.user} />
		{/each}
	</div>

	{#if posts.length === 0}
		<p class="no-posts">No posts yet. Be the first to <a href="/create">create one</a>!</p>
	{/if}
</div>

<style scoped>
	.explore-container {
		padding: 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	.explore-container h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.search-bar {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		align-items: stretch;
	}

	.search-bar form {
		flex: 1;
		display: flex;
		gap: 0.5rem;
		background: white;
		border: 2px solid #ddd;
		border-radius: 12px;
		padding: 0.5rem;
		transition: border-color 150ms ease;
	}

	.search-bar form:focus-within {
		border-color: #7a5cff;
	}

	.search-bar input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 1rem;
		padding: 0.5rem;
		background: transparent;
	}

	.search-bar button[type="submit"] {
		padding: 0.5rem 1rem;
		background: linear-gradient(135deg, #7a5cff, #ff914d);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 150ms ease;
	}

	.search-bar button[type="submit"]:hover {
		opacity: 0.85;
	}

	.mature-toggle {
		padding: 0.75rem 1.5rem;
		background: #f0f0f0;
		border: 2px solid #ddd;
		border-radius: 12px;
		cursor: pointer;
		font-size: 0.95rem;
		font-weight: 600;
		color: #555;
		white-space: nowrap;
		transition: all 150ms ease;
	}

	.mature-toggle:hover {
		background: #e8e8e8;
	}

	.mature-toggle.active {
		background: linear-gradient(135deg, #7a5cff, #ff914d);
		color: white;
		border-color: transparent;
	}

	.active-search {
		background: #f0f0f0;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.clear-search {
		margin-left: auto;
		color: #7a5cff;
		text-decoration: none;
		font-size: 1.5rem;
		line-height: 1;
		padding: 0 0.5rem;
	}

	.clear-search:hover {
		opacity: 0.7;
	}

	.explore-container > p {
		color: #666;
		margin-bottom: 2rem;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}
	.no-posts {
		text-align: center;
		color: #666;
		margin-top: 3rem;
		font-size: 1.1rem;
	}

	.no-posts a {
		color: #667eea;
		text-decoration: none;
	}

	.no-posts a:hover {
		text-decoration: underline;
	}

	.tag-filter {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		font-size: 1rem;
		color: #555;
	}

	.tag-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem 0.75rem;
		background: linear-gradient(135deg, #7a5cff, #ff914d);
		color: #fff;
		font-weight: 600;
		border-radius: 999px;
		font-size: 0.95rem;
		text-decoration: none;
		transition:
			opacity 150ms ease,
			transform 150ms ease;
	}

	.tag-badge:hover {
		opacity: 0.85;
		transform: scale(0.97);
	}

	.remove-x {
		font-size: 1.1rem;
		line-height: 1;
		opacity: 0.8;
	}

	.clear-btn {
		margin-left: 0.5rem;
		color: #7a5cff;
		text-decoration: none;
		font-size: 0.9rem;
	}

	.clear-btn:hover {
		text-decoration: underline;
	}

	.popular-tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: #f8f8f8;
		border-radius: 12px;
	}

	.popular-label {
		font-weight: 600;
		color: #555;
		margin-right: 0.25rem;
	}

	.popular-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid #ddd;
		border-radius: 999px;
		font-size: 0.85rem;
		color: #444;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.popular-tag:hover {
		border-color: #7a5cff;
		color: #7a5cff;
	}

	.popular-tag.active {
		background: linear-gradient(135deg, #7a5cff, #ff914d);
		color: #fff;
		border-color: transparent;
	}

	.popular-tag.active:hover {
		opacity: 0.85;
	}

	.tag-count {
		font-size: 0.75rem;
		opacity: 0.7;
	}
</style>
