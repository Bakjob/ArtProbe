<script>
	let { data } = $props()
</script>

<div class="profile-page">
	<div class="profile-header">
		<div class="avatar">
			{data.user.username.charAt(0).toUpperCase()}
		</div>

		<div class="user-info">
			<h1>{data.user.username}</h1>

			{#if data.user.bio}
				<p class="bio">{data.user.bio}</p>
			{/if}

			<div class="meta">
				{#if data.user.age}
					<span>🎂 Age: {data.user.age}</span>
				{/if}
				{#if data.user.gender}
					<span>⚧ {data.user.gender}</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- ⭐ MASTER STATS GRID -->
	<h2 class="section-title">📊 Seller Stats, hmmm</h2>

	<div class="stats-grid">
		<div class="stat-box"><h3>{data.user.total_gigs}</h3><p>🛠️ Gigs</p></div>
		<div class="stat-box"><h3>{data.user.total_orders}</h3><p>📦 Orders</p></div>
		<div class="stat-box"><h3>{data.user.total_reviews}</h3><p>⭐ Reviews</p></div>
		<div class="stat-box"><h3>{data.user.avg_rating ? data.user.avg_rating.toFixed(1) : 'N/A'}</h3><p>🌟 Avg Rating</p></div>
		<div class="stat-box"><h3>{Math.round(data.user.on_time_rate * 100)}%</h3><p>⏰ On-Time Delivery</p></div>
		<div class="stat-box"><h3>{Math.round(data.user.cancellation_rate * 100)}%</h3><p>❌ Cancellation Rate</p></div>
		<div class="stat-box"><h3>{data.user.repeat_buyers}</h3><p>🔁 Repeat Buyers</p></div>
		<div class="stat-box"><h3>${data.user.total_revenue}</h3><p>💰 Total Revenue</p></div>
		<div class="stat-box"><h3>{data.user.avg_response_time ? Math.round(data.user.avg_response_time) : 'N/A'} min</h3><p>💬 Avg Response Time</p></div>
		<div class="stat-box"><h3>{data.user.first_response_time ? Math.round(data.user.first_response_time) : 'N/A'} min</h3><p>⚡ First Response</p></div>
		<div class="stat-box"><h3>{data.user.last_active ? new Date(data.user.last_active).toLocaleString() : 'N/A'}</h3><p>🟢 Last Active</p></div>
	</div>

	<!-- ⭐ LANGUAGES -->
	{#if data.languages.length > 0}
		<section class="section">
			<h2>🗣️ Languages</h2>
			<div class="tags">
				{#each data.languages as lang}
					<span class="tag">{lang.name} ({lang.proficiency})</span>
				{/each}
			</div>
		</section>
	{/if}

	<!-- ⭐ SKILLS -->
	{#if data.skills.length > 0}
		<section class="section">
			<h2>🧠 Skills</h2>
			<div class="tags">
				{#each data.skills as skill}
					<span class="tag">{skill.category_name}</span>
				{/each}
			</div>
		</section>
	{/if}

	<!-- ⭐ PORTFOLIO -->
	{#if data.portfolio.length > 0}
		<section class="section">
			<h2>🎨 Portfolio</h2>
			<div class="portfolio-grid">
				{#each data.portfolio as item}
					<div class="portfolio-item">
						<img src={item.file_url} alt={item.title || 'Portfolio item'} />
						{#if item.title}
							<p class="portfolio-title">{item.title}</p>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- ⭐ GIG LIST -->
	{#if data.gigs.length > 0}
		<section class="section">
			<h2>📦 Gigs</h2>
			<div class="gigs-list">
				{#each data.gigs as gig}
					<div class="gig-card">
						<h3>{gig.title}</h3>
						<p>{gig.description}</p>
						<div class="gig-meta">🚚 {gig.delivery_days} days</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.profile-page {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

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

	.section-title {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		border-bottom: 3px solid #3b82f6;
		padding-bottom: .5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-box {
		background: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 1.2rem;
		text-align: center;
	}
	.stat-box h3 {
		margin: 0;
		font-size: 1.8rem;
		color: #3b82f6;
	}
	.stat-box p {
		margin: .3rem 0 0 0;
		color: #666;
		font-size: .9rem;
	}

	.section {
		margin-bottom: 2rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: .5rem;
	}

	.tag {
		background: #e2e8f0;
		padding: .5rem 1rem;
		border-radius: 20px;
	}

	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.portfolio-item {
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid #ddd;
	}

	.gigs-list {
		display: grid;
		gap: 1rem;
	}

	.gig-card {
		background: white;
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 1.2rem;
	}
</style>
