<script>
	import { language, setLanguage, t } from '$lib/i18n'

	const languageOptions = [
		{ value: 'en', label: 'English' },
		{ value: 'sv', label: 'Svenska' },
		{ value: 'ja', label: '日本語' }
	]

	let selectedLanguage = $state('en')

	$effect(() => {
		selectedLanguage = $language
	})

	function saveLanguage(event) {
		setLanguage(event.currentTarget.value)
	}
</script>

<div class="settings-container">
	<h1>{t($language, 'settingsTitle')}</h1>

	<div class="card setting-block">
		<label for="language">{t($language, 'languageLabel')}</label>
		<select id="language" bind:value={selectedLanguage} onchange={saveLanguage}>
			{#each languageOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<p class="hint">{t($language, 'languageHint')}</p>
	</div>
</div>

<style scoped>
	.settings-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1.5rem;
	}

	.setting-block {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	label {
		font-weight: 600;
	}

	select {
		padding: 0.6rem 0.9rem;
		border-radius: 8px;
		border: 1px solid #ccc;
		background: white;
		max-width: 240px;
	}

	.hint {
		font-size: 0.9rem;
		color: #888;
	}
</style>
