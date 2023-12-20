import { isArray, isNumber, isObject, isString, undef, } from "./index"
import type { StringOrNumber, StringObject, UnknownObject, StringOrNumberObject } from './types'


// upperCaseFirstLetter
export function upperCaseFirstLetter(txt: string) {
	return txt.charAt(0).toUpperCase() + txt.slice(1)
}


// stringToNumber
export function stringToNumber(stringIn: string | undefined, fallBackValue = 0): number {
	if (undef(stringIn))
		return fallBackValue

	stringIn = stringIn.replace(/^[^\d,.-]+/, '')     // "EUR -123,56$"   =>   "-123,56$"
	stringIn = stringIn.replace(/[^\d,.]+$/, '')      // "-123,56$"       =>   "-123,56"

	const regex = /^(-?)(.*?)([,.]?\d*)$/
	const match = regex.exec(stringIn)
	if (!match)
		return fallBackValue // sollte nie der Fall sein

	const [sign, integer, decimal] = match.slice(1)
	const stringCleaned = sign + integer.replace(/\D/g, '') + decimal.replace(',', '.')
	if (stringCleaned === '')
		return fallBackValue
	else if (stringCleaned === '-0')
		return 0

	return Number(stringCleaned)
}


/**
 * @example replacePlaceholder('Im {height}cm tall', { height: 182 })
 */
export function replacePlaceholder(text: string, params?: StringOrNumberObject, throwErrors = true): string {
	const paramsAsString: StringObject = {}
	for (const key in params)
		paramsAsString[key] = isNumber(params[key]) ? params[key].toString() : (params[key] as string)

	// Alle Keys der übergebenen Parameter in einem Set speichern. Wird ein Key verwendet, wird er aus dem Set gelöscht.
	const unusedParams = new Set<string>(!params ? [] : Object.keys(params))
	const textReplaced = text.replace(/{(\w+)}/g, (match, key) => {
		if (undef(paramsAsString[key]))
			if (throwErrors)
				throw new Error(`ERROR_replacePlaceholder_1:\ntext: ${text}\nparams: ${JSON.stringify(params)}\nNot passed parameter: ${key}\n`)
			else
				return match
		unusedParams.delete(key)
		return paramsAsString[key]
	})

	if (unusedParams.size >= 1 && throwErrors)
		throw new Error(`ERROR_replacePlaceholder_2:\ntext: ${text}\nparams: ${JSON.stringify(params)}\nUnused passed parameters: ${Array.from(unusedParams).join(', ')}`)

	return textReplaced
}


export function replaceFirstPlaceholder(text: string, param: StringOrNumber, throwErrors = true) {
	if (throwErrors) {
		const placeholders = text.match(/{.+?}/g)
		if (!placeholders || placeholders.length !== 1)
			throw new Error('Expected exactly one placeholder to replace in the text.')
	}

	const textValue = isNumber(param) ? param.toString() : param
	const newText = text.replace(/{.+?}/g, textValue)
	return newText
}


export function clearWhiteSpace(text: string) {
	if (!isString(text))
		return ''
	return text.replace(/\s+/g, ' ').trim()
}


// stupid types, lol
export function camelToSnakeCase<Type>(toRename: Type): Type {
	if (isString(toRename))
		return _camelToSnakeCase(toRename) as Type
	else if (isArray(toRename)) {
		return toRename.map((item) => camelToSnakeCase(item)) as Type // recursion
	}
	else if (isObject(toRename)) {
		const newObject: UnknownObject = {}
		for (const propertyName in toRename) {
			const newPropertyName = _camelToSnakeCase(propertyName)
			if (isObject(toRename[propertyName]))
				newObject[newPropertyName] = camelToSnakeCase(toRename[propertyName]) // recursion
			else
				newObject[newPropertyName] = toRename[propertyName]
		}
		return newObject as Type
	}

	throw new Error(`ERROR_camelToSnakeCase_1: unknown type`)
}


function _camelToSnakeCase(toRename: string) {
	return toRename.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()
}


// stupid types, lol
export function snakeToCamelCase<Type>(toRename: Type): Type {
	if (isString(toRename))
		return _snakeToCamelCase(toRename) as Type
	else if (isArray(toRename)) {
		return toRename.map((item) => snakeToCamelCase(item)) as Type // recursion
	}
	else if (isObject(toRename)) {
		const newObject: UnknownObject = {}
		for (const propertyName in toRename) {
			const newPropertyName = _snakeToCamelCase(propertyName)
			if (isObject(toRename[propertyName]))
				newObject[newPropertyName] = snakeToCamelCase(toRename[propertyName]) // recursion
			else
				newObject[newPropertyName] = toRename[propertyName]
		}
		return newObject as Type
	}

	throw new Error(`ERROR_snakeToCamelCase_1: unknown type`)
}


function _snakeToCamelCase(toRename: string): string {
	// This function does the same like the following line, but twice as fast.
	// return toRename.replace(/[_]([a-z])/gi, (match, part1) => part1.toUpperCase())

	let result = ""
	let capitalizeNext = false

	for (let i = 0; i < toRename.length; i++) {
		const currentChar = toRename[i]

		if (currentChar === "_")
			capitalizeNext = true
		else {
			if (capitalizeNext) {
				result += currentChar.toUpperCase()
				capitalizeNext = false
			} else
				result += currentChar
		}
	}

	return result
}
