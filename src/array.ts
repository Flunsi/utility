import { isString, undef } from './index'
import type { StringOrNumberObject } from './types'


// makeItIterable
export function makeItIterable<Type>(items: Type | Array<Type> | undefined): Array<Type> {
	if (undef(items))
		return [] as Array<Type>
	else if (Array.isArray(items))
		return items
	else
		return [items]
}


/**
 * @example generateArray(3) // [0,1,2]
 */
export function generateArray(length: number) {
	return Array.from({ length }, (_, index) => index)
}


// removeDuplicates
export function removeDuplicates<T>(array: T[]): T[] {
	return Array.from(new Set(array))
}


// superSort
export function superSort<Type extends Array<StringOrNumberObject>>(dataArray: Type, sortCriteria: Array<[string, "asc" | "desc"]>) {
	const orderMap = { asc: 1, desc: -1 }
	const modifiedSortCriteria: Array<[string, number]> = sortCriteria.map(([key, order]) => [key, orderMap[order]])

	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
	const sortedArray = dataArray.sort((record1, record2) => {
		for (const [key, order] of modifiedSortCriteria) {
			const value1 = record1[key]
			const value2 = record2[key]
			if (isString(value1) && isString(value2)) {
				const comparison = collator.compare(value1, value2)
				if (comparison !== 0) return comparison * order
			}
			if (value1 < value2) return -1 * order
			if (value1 > value2) return 1 * order
		}
		return 0
	})
	return sortedArray
}
