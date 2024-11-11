
// ACHTUNG: undef(para) ist nicht das selbe wie: !para
//          Unterschied: 0, '', false
//          Diese Werte sind definiert, also bei undef(para) = false
export function undef(para: unknown): para is undefined | null | void {
	return typeof para === 'undefined' || para === null || Number.isNaN(para) || para === void 0
}

// ACHTUNG: def(para) ist nicht das selbe wie: !!para
//          Unterschied: 0, '', false
//          Diese Werte sind definiert, also bei def(para) = true
// eslint-disable-next-line
export function def(para: unknown): para is string | number | boolean | object | symbol | Array<unknown> | Function {
	return !undef(para)
}

// isObject
export function isObject(para: unknown): para is object {
	if (typeof para !== 'object' || Array.isArray(para) || para === null)
		return false

	return true
}

// isSimpleObject
export function isSimpleObject(para: unknown): para is object {
	if (typeof para !== 'object' || Array.isArray(para) || para === null)
		return false

	for (const [propertyName, value] of Object.entries(para))
		if (!isString(propertyName) || !isNumber(value) && !isString(value))
			return false

	return true
}

// isBoolean
export function isBoolean(para: unknown): para is boolean {
	return typeof para === 'boolean'
}

// isArray
export function isArray(para: unknown): para is Array<unknown> {
	return Array.isArray(para)
}

// isNumber
export function isNumber(para: unknown): para is number {
	return typeof para === 'number' && !isNaN(para) && isFinite(para)
}

// isString
export function isString(para: unknown): para is string {
	return (typeof para === 'string')
}

// isElement
export function isElement(para: unknown): para is Element {
	return para instanceof Element
}

// isHTMLElement
export function isHTMLElement(para: unknown): para is HTMLElement {
	return para instanceof HTMLElement
}

// isHTMLInputElement
export function isHTMLInputElement(para: unknown): para is HTMLInputElement {
	return para instanceof HTMLInputElement
}

// isBrowser
export function isBrowser(): boolean {
	return typeof window !== 'undefined'
}
