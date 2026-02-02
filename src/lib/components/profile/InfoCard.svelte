<script>
	let { color = 'white', text = '', symbol = '', href = '', onClick, onError } = $props()

	let lastErrorSignature = ''
	let symbolImgFailed = $state(false)

	function emitError(err) {
		// Svelte 5: prefer callback props over createEventDispatcher
		if (typeof onError === 'function') onError(err)
	}

	function reportInvalidProps(details) {
		const signature = JSON.stringify(details)
		if (signature === lastErrorSignature) return
		lastErrorSignature = signature

		const err = {
			code: 'invalid-props',
			message: 'Invalid props passed to ProfileCard',
			details
		}

		console.warn('[ProfileCard]', err.message, err.details)
		emitError(err)
	}

	function reportSymbolLoadFailed(src) {
		const signature = `symbol-load-failed:${src}`
		if (signature === lastErrorSignature) return
		lastErrorSignature = signature

		const err = {
			code: 'symbol-load-failed',
			message: 'Failed to load symbol image',
			details: { src }
		}

		console.warn('[ProfileCard]', err.message, err.details)
		emitError(err)
	}

	function asOptionalString(value) {
		if (value == null) return undefined
		return typeof value === 'string' ? value : undefined
	}

	function handleActivate(event) {
		if (typeof onClick === 'function') onClick(event)
	}

	let safeColor = $derived(asOptionalString(color) ?? 'white')
	let safeText = $derived(asOptionalString(text) ?? '')
	let safeSymbol = $derived(asOptionalString(symbol) ?? '')
	let safeHref = $derived(asOptionalString(href) ?? '')
	let isSymbolImage = $derived(
		!!safeSymbol && /^(\/|https?:\/\/|data:image\/)/i.test(safeSymbol.trim())
	)

	$effect(() => {
		const invalid = {}
		if (color != null && typeof color !== 'string') invalid.color = color
		if (text != null && typeof text !== 'string') invalid.text = text
		if (symbol != null && typeof symbol !== 'string') invalid.symbol = symbol
		if (href != null && typeof href !== 'string') invalid.href = href
		if (onClick != null && typeof onClick !== 'function') invalid.onClick = onClick
		if (onError != null && typeof onError !== 'function') invalid.onError = onError
		if (Object.keys(invalid).length) reportInvalidProps(invalid)
	})

	$effect(() => {
		safeSymbol
		symbolImgFailed = false
	})

	function onSymbolImgError() {
		symbolImgFailed = true
		if (safeSymbol) reportSymbolLoadFailed(safeSymbol)
	}
</script>

{#if safeHref}
	<a
		class="profile-card"
		href={safeHref}
		style={`--card-bg: ${safeColor};`}
		aria-label={safeText || 'Open'}
		onclick={handleActivate}
	>
		{#if safeSymbol}
			{#if isSymbolImage}
				{#if !symbolImgFailed}
					<img
						class="symbol-img"
						src={safeSymbol}
						alt=""
						aria-hidden="true"
						onerror={onSymbolImgError}
						loading="lazy"
					/>
				{/if}
			{:else}
				<span class="symbol" aria-hidden="true">{safeSymbol}</span>
			{/if}
		{/if}

		{#if safeText}
			<span class="text">{safeText}</span>
		{/if}
	</a>
{:else}
	<button
		class="profile-card"
		type="button"
		style={`--card-bg: ${safeColor};`}
		aria-label={safeText || 'Action'}
		onclick={handleActivate}
	>
		{#if safeSymbol}
			{#if isSymbolImage}
				{#if !symbolImgFailed}
					<img
						class="symbol-img"
						src={safeSymbol}
						alt=""
						aria-hidden="true"
						onerror={onSymbolImgError}
						loading="lazy"
					/>
				{/if}
			{:else}
				<span class="symbol" aria-hidden="true">{safeSymbol}</span>
			{/if}
		{/if}

		{#if safeText}
			<span class="text">{safeText}</span>
		{/if}
	</button>
{/if}

<style>
	.profile-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 2rem 1.5rem;
		border-radius: 12px;
		border: none;
		background: var(--card-bg, white);
		width: 100%;
		aspect-ratio: 1 / 1;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		user-select: none;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.profile-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.profile-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.profile-card:hover::before {
		transform: scaleX(1);
	}

	.profile-card:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.symbol {
		font-size: 2.5rem;
		line-height: 1;
		filter: grayscale(0.3);
		transition: filter 0.3s ease;
	}

	.profile-card:hover .symbol {
		filter: grayscale(0);
	}

	.symbol-img {
		width: 90%;
		height: 90%;
		object-fit: cover;
		border-radius: 8px;
		opacity: 0.7;
		transition: all 0.3s ease;
	}

	.profile-card:hover .symbol-img {
		opacity: 1;
		transform: scale(1.05);
	}

	.text {
		color: #333;
		text-align: center;
		font-size: 1.1rem;
		font-weight: 600;
		text-transform: capitalize;
		letter-spacing: 0.5px;
	}
</style>
