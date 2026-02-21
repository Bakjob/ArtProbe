<script>
	import { onMount } from 'svelte'
	import { language, t } from '$lib/i18n'

	let isDark = true

	function applyTheme(dark) {
		const theme = dark ? 'dark' : 'light'
		document.documentElement.dataset.theme = theme
		localStorage.setItem('theme', theme)
	}

	onMount(() => {
		const stored = localStorage.getItem('theme')
		const theme = stored === 'light' ? 'light' : 'dark'
		isDark = theme === 'dark'
		document.documentElement.dataset.theme = theme
	})
</script>

<div class="theme-toggle" aria-live="polite">
	<span class="label">{t($language, 'theme')}</span>
	<div class="switch">
		<span class:active={isDark}>{t($language, 'dark')}</span>
		<label class="toggle">
			<input
				type="checkbox"
				checked={isDark}
				aria-label={t($language, 'theme')}
				onchange={(e) => {
					isDark = e.currentTarget.checked
					applyTheme(isDark)
				}}
			/>
			<span class="slider"></span>
		</label>
		<span class:active={!isDark}>{t($language, 'light')}</span>
	</div>
</div>

<style scoped>
	.theme-toggle {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: #ffde59;
	}

	.label {
		font-weight: 600;
	}

	.switch {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	.switch span {
		opacity: 0.7;
	}

	.switch span.active {
		opacity: 1;
		font-weight: 600;
	}

	.toggle {
		position: relative;
		display: inline-block;
		width: 44px;
		height: 24px;
	}

	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #444;
		transition: 0.2s;
		border-radius: 999px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 18px;
		width: 18px;
		left: 3px;
		top: 3px;
		background-color: white;
		transition: 0.2s;
		border-radius: 50%;
	}

	.toggle input:checked + .slider {
		background-color: #ff914d;
	}

	.toggle input:checked + .slider:before {
		transform: translateX(20px);
	}
</style>
