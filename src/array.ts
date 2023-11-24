import { undef } from './index'
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

	const sortedArray = dataArray.sort((a, b) => {
		for (const [key, order] of modifiedSortCriteria) {
			if (a[key] < b[key]) return order * -1
			if (a[key] > b[key]) return order
		}
		return 0
	})
	return sortedArray
}
