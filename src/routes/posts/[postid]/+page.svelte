<script>
	import LikeButton from '$lib/components/LikeButton.svelte'
	import { language, t } from '$lib/i18n'

	let { data } = $props()
	let post = $derived(data.post)
</script>

{#if post}
	<div class="post-container">
		<div class="post-header">
			<div class="user-info">
				{#if post.profile_picture_url}
					<img src={post.profile_picture_url} alt={post.username} class="profile-pic" />
				{:else}
					<div class="profile-pic-placeholder">{post.username[0].toUpperCase()}</div>
				{/if}
				<a href="/profile/{post.username}" class="username">{post.username}</a>
			</div>
		<span class="post-date">
			{new Date(post.created_at).toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })}
		</span>
		</div>

		<img src={post.file_url} alt={post.title} class="post-image" />

		<div class="post-content">
			<h1>{post.title}</h1>
			{#if post.description}
				<p class="description">{post.description}</p>
			{/if}

			{#if post.tags && post.tags.length > 0}
				<div class="tags">
					{#each post.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}

			<div class="post-stats">
				<LikeButton {post} user={data.user} />
			</div>
		</div>
	</div>
{:else if data.error}
	<div class="error">
		<h1>{t($language, 'errorTitle')}</h1>
		<p>{data.error}</p>
	</div>
{:else if data.removed}
	<div class="error removed">
		<h1>{t($language, 'postRemovedTitle')}</h1>
		<p>{t($language, 'postRemovedBody')}</p>
	</div>
{/if}

<style>
	.post-container {
		max-width: 800px;
		margin: 2rem auto;
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid #eee;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.profile-pic {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}

	.profile-pic-placeholder {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: 1.2rem;
	}

	.username {
		font-weight: 600;
		color: #333;
		text-decoration: none;
	}

	.username:hover {
		color: #667eea;
	}

	.post-date {
		color: #666;
		font-size: 0.9rem;
	}

	.post-image {
		width: 100%;
		max-height: 600px;
		object-fit: contain;
		background: #f5f5f5;
	}

	.post-content {
		padding: 1.5rem;
	}

	.post-content h1 {
		margin: 0 0 1rem 0;
		font-size: 1.8rem;
		color: #333;
	}

	.description {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.tag {
		padding: 0.4rem 0.8rem;
		background: #f0f0f0;
		border-radius: 20px;
		font-size: 0.9rem;
		color: #555;
	}

	.post-stats {
		padding-top: 1rem;
		border-top: 1px solid #eee;
	}

	.error {
		max-width: 600px;
		margin: 4rem auto;
		text-align: center;
		padding: 2rem;
	}

	.error h1 {
		color: #e53e3e;
		margin-bottom: 1rem;
	}

	.error p {
		color: #666;
	}

	.error.removed h1 {
		color: #555;
	}
</style>
