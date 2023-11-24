import { makeItIterable, generateArray, removeDuplicates, superSort } from './array'


describe('makeItIterable', () => {
	test.each([
		{ param: [123], expected: [123] },
		{ param: [1, 2, 3], expected: [1, 2, 3] },
		{ param: [{}], expected: [{}] },
		{ param: [{ foo: 123 }], expected: [{ foo: 123 }] },
		{ param: 'abc', expected: ['abc'] },
		{ param: 123, expected: [123] },
		{ param: { foo: 123 }, expected: [{ foo: 123 }] },
		{ param: undefined, expected: [] },
		{ param: null, expected: [] },
		{ param: null, expected: [] },
		{ param: NaN, expected: [] },
		{ param: void 0, expected: [] },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(makeItIterable(param)).toEqual(expected)
	})
})


describe('generateArray', () => {
	test.each([
		{ param: -1, expected: [] },
		{ param: 0, expected: [] },
		{ param: 1, expected: [0] },
		{ param: 3, expected: [0, 1, 2] },
	])('$param  =  $expected', ({ param, expected }) => {
		// expect(clamp(...param)).toEqual(expected)
		expect(generateArray(param)).toEqual(expected)
	})
})


describe('removeDuplicates', () => {
	test.each([
		{ param: [1, 2, 3], expected: [1, 2, 3] },
		{ param: [1, 2, 3, 1, 2, 3], expected: [1, 2, 3] },
		{ param: ['de', 'de', 'de_de', 'de', 'de_ch', 'de_ch'], expected: ['de', 'de_de', 'de_ch'] },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(removeDuplicates(param as Array<unknown>)).toEqual(expected)
	})
})


describe('superSort', () => {
	const start = [{ 'a': 1, 'b': 1, }, { 'a': 2, 'b': 3, }, { 'a': 1, 'b': 4, }, { 'a': 2, 'b': 2, }]
	const ExpectedAscAsc = [{ 'a': 1, 'b': 1, }, { 'a': 1, 'b': 4, }, { 'a': 2, 'b': 2, }, { 'a': 2, 'b': 3, }]
	const ExpectedAscDesc = [{ 'a': 1, 'b': 4, }, { 'a': 1, 'b': 1, }, { 'a': 2, 'b': 3, }, { 'a': 2, 'b': 2, }]
	const ExpectedDescAsc = [{ 'a': 2, 'b': 2, }, { 'a': 2, 'b': 3, }, { 'a': 1, 'b': 1, }, { 'a': 1, 'b': 4, }]
	const ExpectedDescDesc = [{ 'a': 2, 'b': 3, }, { 'a': 2, 'b': 2, }, { 'a': 1, 'b': 4, }, { 'a': 1, 'b': 1, }]

	test.each([
		{ data: start, sortCriteria: [['a', 'asc'], ['b', 'asc']], expected: ExpectedAscAsc },
		{ data: start, sortCriteria: [['a', 'asc'], ['b', 'desc']], expected: ExpectedAscDesc },
		{ data: start, sortCriteria: [['a', 'desc'], ['b', 'asc']], expected: ExpectedDescAsc },
		{ data: start, sortCriteria: [['a', 'desc'], ['b', 'desc']], expected: ExpectedDescDesc },
	])('$data  +  $sortCriteria  =  $expected', ({ data, sortCriteria, expected }) => {
		expect(superSort(data, sortCriteria as Array<[string, "asc" | "desc"]>)).toEqual(expected)
	})
})
