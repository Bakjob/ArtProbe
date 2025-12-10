<script>
	let { skills } = $props()
</script>

{#if skills.length > 0}
	<section class="section">
		<h2>🧠 Skills</h2>
		<div class="tags">
			{#each skills as skill}
				<span class="tag">{skill.category_name}</span>
			{/each}
		</div>
	</section>
{/if}

<style>
	.section {
		margin-bottom: 2rem;
	}

	h2 {
		margin-bottom: 1rem;
		border-bottom: 2px solid #3b82f6;
		padding-bottom: 0.5rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background: #e2e8f0;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		transition: background 0.2s;
	}

	.tag:hover {
		background: #cbd5e1;
	}
</style>
