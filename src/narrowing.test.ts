import { def, undef, isObject, isSimpleObject, isBoolean, isArray, isNumber, isString } from './narrowing'

//ts
describe('isNumber', () => {
	test.each([
		{ param: 0, expected: true },
		{ param: 123, expected: true },

		{ param: new Number(123), expected: false },
		{ param: '123', expected: false },

		{ param: Infinity, expected: false },
		{ param: undefined, expected: false },
		{ param: null, expected: false },
		{ param: NaN, expected: false },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(isNumber(param)).toEqual(expected)
	})
})


describe('isString', () => {
	test.each([
		{ param: '', expected: true },
		{ param: 'undefined', expected: true },
		{ param: 'asdf', expected: true },

		{ param: new String('Thats not a string, come on!'), expected: false },
		{ param: 123, expected: false },

		{ param: undefined, expected: false },
		{ param: null, expected: false },
		{ param: NaN, expected: false },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(isString(param)).toEqual(expected)
	})
})


describe('isBoolean', () => {
	test.each([
		{ param: true, expected: true },
		{ param: false, expected: true },

		{ param: 123, expected: false },
		{ param: 'abc', expected: false },

		{ param: undefined, expected: false },
		{ param: null, expected: false },
		{ param: NaN, expected: false },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(isBoolean(param)).toEqual(expected)
	})
})


describe('isArray', () => {
	test.each([
		{ param: [], expected: true },
		{ param: [123, 456], expected: true },

		{ param: 123, expected: false },

		{ param: undefined, expected: false },
		{ param: null, expected: false },
		{ param: NaN, expected: false },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(isArray(param)).toEqual(expected)
	})
})


describe('isObject', () => {
	test.each([
		{ param: {}, expected: true },
		{ param: { field1: 123 }, expected: true },

		{ param: 123, expected: false },
		{ param: [123, 456], expected: false },

		{ param: undefined, expected: false },
		{ param: null, expected: false },
		{ param: NaN, expected: false },
		{ param: void 0, expected: false },
		{ param: () => { 0 }, expected: false },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(isObject(param)).toEqual(expected)
	})
})


describe('isSimpleObject', () => {
	test.each([
		{ param: {}, expected: true },
		{ param: { field1: 123 }, expected: true },
		{ param: { field1: 'abc' }, expected: true },
		{ param: { field1: 123, field2: 'abc' }, expected: true },

		{ param: 123, expected: false },
		{ param: [123, 456], expected: false },

		{ param: { field1: 123, field2: { foo: 'bar' } }, expected: false },
		{ param: { field1: 123, field2: [123] }, expected: false },
		{ param: { field1: [123], field2: 123 }, expected: false },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(isSimpleObject(param)).toEqual(expected)
	})
})


describe('undef', () => {
	test.each([
		{ param: 0, expected: false },
		{ param: '', expected: false },
		{ param: false, expected: false },
		{ param: true, expected: false },
		{ param: 'undefined', expected: false },
		{ param: [], expected: false },
		{ param: {}, expected: false },
		{ param: () => { 0 }, expected: false },
		{ param: 'undefined', expected: false },

		{ param: undefined, expected: true },
		{ param: null, expected: true },
		{ param: NaN, expected: true },
		{ param: void 0, expected: true },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(undef(param)).toEqual(expected)
	})
})


describe('def', () => {
	test.each([
		{ param: 0, expected: true },
		{ param: '', expected: true },
		{ param: false, expected: true },
		{ param: true, expected: true },
		{ param: 'undefined', expected: true },
		{ param: [], expected: true },
		{ param: {}, expected: true },
		{ param: () => { 0 }, expected: true },
		{ param: 'undefined', expected: true },

		{ param: undefined, expected: false },
		{ param: null, expected: false },
		{ param: NaN, expected: false },
		{ param: void 0, expected: false },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(def(param)).toEqual(expected)
	})
})
