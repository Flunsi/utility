let lastInfoText = ''
let lastTime = 0
export function logTime(infoText = '', clear = false) {
	if (!clear && lastTime > 0) {
		const timeDif = Date.now() - lastTime
		const timeDifString = timeDif.toString().padStart(6, ' ')
		console.log('logTime: %s ms   %s', timeDifString, lastInfoText ?? '')
	}

	lastInfoText = infoText
	lastTime = Date.now()
}
