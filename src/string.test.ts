import { stringToNumber, replacePlaceholder, camelToSnakeCase, snakeToCamelCase, upperCaseFirstLetter, clearWhiteSpace } from './string'
import type { StringOrNumberObject } from './types'


describe('stringToNumber', () => {
	test.each([
		{ param: undefined, expected: 0 },
		{ param: "zehn", expected: 0 },
		{ param: "123", expected: 123 },
		{ param: "123.456", expected: 123.456 },
		{ param: "0.456", expected: 0.456 },
		{ param: ".456", expected: .456 },
		{ param: "0", expected: 0 },
		{ param: "-0", expected: 0 },

		{ param: "EUR 123", expected: 123 },
		{ param: "123 EUR", expected: 123 },
		{ param: "EUR -123", expected: -123 },
		{ param: "-123 EUR", expected: -123 },

		{ param: "123,456", expected: 123.456 },
		{ param: "0,456", expected: 0.456 },
		{ param: ",456", expected: 0.456 },

		{ param: " EUR  123'456.789", expected: 123456.789 },
		{ param: " EUR  123,456.789", expected: 123456.789 },
		{ param: " EUR  123 456.789", expected: 123456.789 },

		{ param: " EUR  123'456,789", expected: 123456.789 },
		{ param: " EUR  123.456,789", expected: 123456.789 },
		{ param: " EUR  123 456,789", expected: 123456.789 },

		{ param: " EUR -123'456.789", expected: -123456.789 },
		{ param: " EUR -123,456.789", expected: -123456.789 },
		{ param: " EUR -123 456.789", expected: -123456.789 },

		{ param: " EUR -123'456,789", expected: -123456.789 },
		{ param: " EUR -123.456,789", expected: -123456.789 },
		{ param: " EUR -123 456,789", expected: -123456.789 },

	])('$param  =  $expected', ({ param, expected }) => {
		expect(stringToNumber(param)).toEqual(expected)
	})
})


describe('stringToNumber fallBackValue', () => {
	const fallBackValue = 100
	test.each([
		{ param: undefined, expected: 100 },
		{ param: "zehn", expected: 100 },
		{ param: "123", expected: 123 },
		{ param: "123.456", expected: 123.456 },
		{ param: "0.456", expected: 0.456 },
		{ param: ".456", expected: .456 },
		{ param: "0", expected: 0 },
		{ param: "-0", expected: 0 },

	])('$param  =  $expected', ({ param, expected }) => {
		expect(stringToNumber(param, fallBackValue)).toEqual(expected)
	})
})


describe('replacePlaceholder', () => {
	const data: StringOrNumberObject = { field1: 'ABC', field2: 123 }
	const partData: StringOrNumberObject = { field1: 'ABC' }
	const emptyData: StringOrNumberObject = { field1: '' }
	const noData: StringOrNumberObject = {}

	// throwErrors = false
	test.each<{ text: string, values: StringOrNumberObject, expected: string }>([
		{ text: '', values: data, expected: '' },
		{ text: '{field1}', values: data, expected: 'ABC' },
		{ text: '{field1}{field2}', values: data, expected: 'ABC123' },
		{ text: 'xxx{field1}xxx{field2}xxx', values: data, expected: 'xxxABCxxx123xxx' },
		{ text: 'xxx{{field1}}xxx', values: data, expected: 'xxx{ABC}xxx' },

		{ text: 'xxx{field1}xxx{field2}xxx', values: partData, expected: 'xxxABCxxx{field2}xxx' },

		{ text: 'xxx{field1}xxx{field2}xxx', values: emptyData, expected: 'xxxxxx{field2}xxx' },

		{ text: '', values: noData, expected: '' },
		{ text: 'nix zu ersetzen', values: noData, expected: 'nix zu ersetzen' },
		{ text: '{field1}', values: noData, expected: '{field1}' },
		{ text: '{field1}{field2}', values: noData, expected: '{field1}{field2}' },
		{ text: 'xxx{field1}xxx{field2}xxx', values: noData, expected: 'xxx{field1}xxx{field2}xxx' },
		{ text: 'xxx{{field1}}xxx', values: noData, expected: 'xxx{{field1}}xxx' },

	])('$text  +  values  =  $expected', ({ text, values, expected }) => {
		expect(replacePlaceholder(text, values, false)).toEqual(expected)
	})

	// throwErrors = true
	test.each<{ text: string, values: StringOrNumberObject }>([
		{ text: '{field1}', values: data },						// Zuviel Parameter übergeben
		{ text: '{field1}{field2}{field3}', values: data },		// Zuwenig Parameter übergeben
	])('$text  +  values', ({ text, values }) => {
		expect(() => replacePlaceholder(text, values, true)).toThrow()
	})
})


const camelAndSnake = [
	// string
	{ camel: 'abc', snake: 'abc' },
	{ camel: 'abcDef', snake: 'abc_def' },
	{ camel: 'abcDefGhi', snake: 'abc_def_ghi' },

	// object
	{ camel: { 'abc': 'abc', 'abcDef': 'abcDef', 'abcDefGhi': 'abcDefGhi' }, snake: { 'abc': 'abc', 'abc_def': 'abcDef', 'abc_def_ghi': 'abcDefGhi' } },

	// array
	{ camel: ['abc', 'abcDef', 'abcDefGhi'], snake: ['abc', 'abc_def', 'abc_def_ghi'] },
]


describe('camelToSnakeCase', () => {
	test.each(camelAndSnake)('$camel  =>  $snake', ({ camel, snake }) => {
		expect(camelToSnakeCase(camel)).toEqual(snake)
	})
})


describe('snakeToCamelCase', () => {
	test.each(camelAndSnake)('$snake  =>  $snake', ({ camel, snake }) => {
		expect(snakeToCamelCase(snake)).toEqual(camel)
	})
})


describe('upperCaseFirstLetter', () => {
	test.each([
		{ param: '', expected: '' },
		{ param: 'abcd', expected: 'Abcd' },
		{ param: 'ABCD', expected: 'ABCD' },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(upperCaseFirstLetter(param)).toEqual(expected)
	})
})


describe('clearWhiteSpace', () => {
	test.each([
		{ param: '', expected: '' },
		{ param: ' ', expected: '' },
		{ param: 'abcd', expected: 'abcd' },
		{ param: '  ab  cd  ', expected: 'ab cd' },
	])('$param  =  $expected', ({ param, expected }) => {
		expect(clearWhiteSpace(param)).toEqual(expected)
	})
})
