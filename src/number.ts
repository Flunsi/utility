import type { Num100 } from './types'


// clamp
export function clamp(num: number, min: number, max: number) {
	if (min > max)
		throw new Error(`ERROR_clamp_1: clamp: min > max`)
	return Math.min(Math.max(num, min), max)
}

// roundDynamic10
export function roundDynamic10(value: number): number {
	// value >= 10  wird gerunde mit:  0 Nachkommastellen
	// value <  10  wird gerunde mit:  1 Nachkommastellen
	let round_factor = 10
	if (value >= 10)
		round_factor = 1

	value = Math.round(value * round_factor) / round_factor
	return value
}


// roundDynamic100
export function roundDynamic100(value: number): number {
	// value >= 100  wird gerunde mit:  0 Nachkommastellen
	// value >=  10  wird gerunde mit:  1 Nachkommastellen
	// value <   10  wird gerunde mit:  2 Nachkommastellen
	let round_factor = 100
	if (value >= 100)
		round_factor = 1
	else if (value >= 10)
		round_factor = 10

	value = Math.round(value * round_factor) / round_factor
	return value
}

export function calcValueFromPercent(percent: Num100, startPoint = 0, endPoint = 100): number {
	return startPoint + (endPoint - startPoint) / 100 * percent
}
