<script>
  import ExploreCard from '$lib/components/ExploreCard.svelte'

  const ads = [
    {
      title: 'Ancient Scroll',
      image: '',
      description: 'Secrets it holds… much power hmm'
    },
    {
      title: 'Mystic Crystal',
      image: '/crystal.png',
      description: 'Glow in the dark it does 💫'
    },
    {
      title: 'Yoda Plushie',
      image: '/yoda.png',
      description: 'Cuteness strong with this one 🧸💚'
    }
  ]
</script>

<div class="explore-container">
	<h1>Explore</h1>
	<p>Discover new content and artworks here.</p>
	<p>Return to the <a href="/">home page</a>.</p>

    <div class="card-grid">
        {#each ads as ad}
            <ExploreCard {ad} />
        {/each}
    </div>
</div>

<style scoped>
  .explore-container {
    padding: 2rem;
    text-align: center;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
</style>
