import { clamp, roundDynamic10, roundDynamic100, calcValueFromPercent } from '../src/number'


describe('clamp', () => {
	test.each([
		{ param: [10, 20, 40], expected: 20 },
		{ param: [20, 20, 40], expected: 20 },
		{ param: [30, 20, 40], expected: 30 },
		{ param: [40, 20, 40], expected: 40 },
		{ param: [50, 20, 40], expected: 40 },
	])('$param  =  $expected', ({ param, expected }) => {
		// expect(clamp(...param)).toEqual(expected)
		expect(clamp(param[0], param[1], param[2])).toEqual(expected)
	})

	test('toThrow', () => { expect(() => clamp(30, 40, 20)).toThrow() })
})


describe('roundDynamic10', () => {
	test.each([
		{ param: 111.1, expected: 111 },
		{ param: 11.11, expected: 11 },
		{ param: 1.111, expected: 1.1 },
		{ param: 0.111, expected: 0.1 },
		{ param: 0.011, expected: 0 },
		{ param: 0.001, expected: 0 },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(roundDynamic10(param)).toEqual(expected)
	})
})


describe('roundDynamic100', () => {
	test.each([
		{ param: 111.11, expected: 111 },
		{ param: 11.111, expected: 11.1 },
		{ param: 1.1111, expected: 1.11 },
		{ param: 0.1111, expected: 0.11 },
		{ param: 0.0111, expected: 0.01 },
		{ param: 0.0011, expected: 0.00 },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(roundDynamic100(param)).toEqual(expected)
	})
})


describe('calcValueFromPercent', () => {
	test.each([
		{ percent: 0, start: 0, end: 0, expected: 0 },
		{ percent: 300, start: 0, end: 0, expected: 0 },

		{ percent: 0, start: 100, end: 300, expected: 100 },
		{ percent: 50, start: 100, end: 300, expected: 200 },
		{ percent: 100, start: 100, end: 300, expected: 300 },
		{ percent: 200, start: 100, end: 300, expected: 500 },

		{ percent: 0, start: 300, end: 100, expected: 300 },
		{ percent: 50, start: 300, end: 100, expected: 200 },
		{ percent: 100, start: 300, end: 100, expected: 100 },
		{ percent: 200, start: 300, end: 100, expected: -100 },

		{ percent: 0, start: -300, end: -100, expected: -300 },
		{ percent: 50, start: -300, end: -100, expected: -200 },
		{ percent: 100, start: -300, end: -100, expected: -100 },
		{ percent: 200, start: -300, end: -100, expected: 100 },
	])('$percent  $start  $end  =  $expected', ({ percent, start, end, expected }) => {
		expect(calcValueFromPercent(percent, start, end)).toEqual(expected)
	})
})
