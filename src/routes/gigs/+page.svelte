<script>
	import { language, t } from '$lib/i18n'
	let gigs = []
</script>

<div class="container">
	<h1>{t($language, 'gigsTitle')}</h1>
	<p>{t($language, 'noGigs')}</p>
	<h2>{t($language, 'featureNotImplemented')}</h2>
</div>

<style>
	.container {
		padding: 2rem;
	}

	h1 {
		margin-bottom: 1rem;
	}
</style>
