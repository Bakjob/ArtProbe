<!-- src/routes/test/+page.svelte -->
<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>User Profile - ArtProbe</title>
</svelte:head>

<div class="profile-container">
	<!-- Header -->
	<div class="profile-header">
		<img src="/nate.png" alt="" class="profile-pic" />
		<div class="user-info">
			<h1 class="username">Nate Higgerson</h1>
			<p class="user-bio">Body cam off since 2005!</p>
			<div class="user-details">
				<span class="age">Age: 288</span>
				<span class="location">Location: New York</span>
			</div>
		</div>
	</div>

	<!-- Stats -->
	<div class="profile-stats">
		<div class="stat">
			<span class="stat-number">67</span>
			<span class="stat-label">Projects</span>
		</div>
		<div class="stat">
			<span class="stat-number">420</span>
			<span class="stat-label">Followers</span>
		</div>
		<div class="stat">
			<span class="stat-number">67</span>
			<span class="stat-label">Following</span>
		</div>
	</div>

	<!-- Portfolio -->
	<section class="portfolio">
		<h2>Portfolio</h2>
		<div class="portfolio-grid">
			<img src="https://via.placeholder.com/200" alt="Portfolio Item" />
			<img src="https://via.placeholder.com/200" alt="Portfolio Item" />
			<img src="https://via.placeholder.com/200" alt="Portfolio Item" />
			<img src="https://via.placeholder.com/200" alt="Portfolio Item" />
		</div>
	</section>

	<!-- Skills & Languages -->
	<section class="skills-languages">
		<h2>Skills & Languages</h2>
		<div class="skills">
			<span class="skill">Illustration</span>
			<span class="skill">UI Design</span>
			<span class="skill">Animation</span>
			<span class="skill">Web Development</span>
			<!-- New skill added -->
		</div>
		<div class="languages">
			<span class="language">English (Native)</span>
			<span class="language">Spanish (Fluent)</span>
		</div>
	</section>

	<!-- Contact / Social -->
	<section class="contact">
		<h2>Contact</h2>
		<p>Email: johndoe@example.com</p>
		<div class="social-links">
			<a href="ds">Twitter</a>
			<a href="ds">LinkedIn</a>
			<a href="ds">Behance</a>
		</div>
	</section>
</div>

<style scoped>
	/* Container */
	.profile-container {
		max-width: 1000px;
		margin: 2rem auto;
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Header */
	.profile-header {
		display: flex;
		gap: 2rem;
		align-items: center;
		background: #1a1a1a;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
	}

	.profile-pic {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid #ffde59;
	}

	.user-info .username {
		font-size: 2rem;
		margin: 0 0 0.3rem 0;
	}

	.user-bio {
		margin: 0.3rem 0 0.5rem 0;
		color: #ccc;
		font-style: italic;
	}

	.user-details span {
		display: inline-block;
		margin-right: 1rem;
		font-size: 0.9rem;
		color: #aaa;
	}

	/* Stats */
	.profile-stats {
		display: flex;
		justify-content: space-around;
		background: #1a1a1a;
		padding: 1rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		gap: 2rem;
	}

	.stat {
		text-align: center;
	}

	.stat-number {
		font-size: 1.5rem;
		font-weight: bold;
		color: #ffde59;
	}

	/* Section titles */
	h2 {
		border-bottom: 2px solid #ffde59;
		padding-bottom: 0.25rem;
		margin-bottom: 1rem;
		color: #ffde59;
	}

	/* Portfolio Grid */
	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.portfolio-grid img {
		width: 100%;
		border-radius: 12px;
		object-fit: cover;
		transition:
			transform 0.3s,
			box-shadow 0.3s;
	}

	.portfolio-grid img:hover {
		transform: scale(1.05);
		box-shadow: 0 0 15px #ffde59;
	}

	/* Skills & Languages */
	.skills,
	.languages {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.skill,
	.language {
		background-color: #2a2a2a;
		padding: 0.4rem 0.8rem;
		border-radius: 8px;
		font-size: 0.9rem;
	}

	/* Social Links */
	.social-links a {
		margin-right: 1rem;
		color: #ffde59;
		text-decoration: none;
		transition: color 0.3s;
	}

	.social-links a:hover {
		color: #ff914d;
	}
</style>
