import { isBrowser } from '../index'


// clickOnScrollbar
export function clickOnScrollbar(mouseEvent: MouseEvent): boolean {
	if (!isBrowser)
		return false

	const clickOnVerticalScrollbar = mouseEvent.clientX >= document.documentElement.clientWidth
	const clickOnHorizontalScrollbar = mouseEvent.clientY >= document.documentElement.clientHeight
	return (clickOnVerticalScrollbar || clickOnHorizontalScrollbar)
}

// getComputedFontSize
export function getComputedFontSize(): number {
	if (!isBrowser)
		return 16

	return parseFloat(getComputedStyle(document.documentElement).fontSize)
}