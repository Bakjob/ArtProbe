<script>
	let { user } = $props()
</script>

<h2 class="section-title">📊 Seller Stats</h2>

<div class="stats-grid">
	<div class="stat-box">
		<h3>{user.total_gigs}</h3>
		<p>🛠️ Gigs</p>
	</div>
	<div class="stat-box">
		<h3>{user.total_orders}</h3>
		<p>📦 Orders</p>
	</div>
	<div class="stat-box">
		<h3>{user.total_reviews}</h3>
		<p>⭐ Reviews</p>
	</div>
	<div class="stat-box">
		<h3>{user.avg_rating != null ? Number(user.avg_rating).toFixed(1) : 'N/A'}</h3>
		<p>🌟 Avg Rating</p>
	</div>
	<div class="stat-box">
		<h3>
			{user.on_time_rate != null ? Math.round(user.on_time_rate * 100) + '%' : 'N/A'}
		</h3>
		<p>⏰ On-Time Delivery</p>
	</div>
	<div class="stat-box">
		<h3>
			{user.cancellation_rate != null ? Math.round(user.cancellation_rate * 100) + '%' : 'N/A'}
		</h3>
		<p>❌ Cancellation Rate</p>
	</div>
	<div class="stat-box">
		<h3>{user.repeat_buyers}</h3>
		<p>🔁 Repeat Buyers</p>
	</div>
	<div class="stat-box">
		<h3>${user.total_revenue}</h3>
		<p>💰 Total Revenue</p>
	</div>
	<div class="stat-box">
		<h3>{user.avg_response_time ? Math.round(user.avg_response_time) : 'N/A'} min</h3>
		<p>💬 Avg Response Time</p>
	</div>
	<div class="stat-box">
		<h3>
			{user.first_response_time ? Math.round(user.first_response_time) : 'N/A'} min
		</h3>
		<p>⚡ First Response</p>
	</div>
	<div class="stat-box">
		<h3>{user.last_active ? new Date(user.last_active).toLocaleString() : 'N/A'}</h3>
		<p>🟢 Last Active</p>
	</div>
</div>

<style>
	.section-title {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		border-bottom: 3px solid #3b82f6;
		padding-bottom: 0.5rem;
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
		transition: transform 0.2s;
	}

	.stat-box:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.stat-box h3 {
		margin: 0;
		font-size: 1.8rem;
		color: #3b82f6;
	}

	.stat-box p {
		margin: 0.3rem 0 0 0;
		color: #666;
		font-size: 0.9rem;
	}
</style>
