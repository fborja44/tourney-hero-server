/**
 * Gets the number suffix for a given number.
 * @param num The number to parse
 * @returns The number suffix
 */
export const getNumberSuffix = (num: number): string => {
	// Get the last digit of the number
	const lastDigit = num % 10;

	// Get the last two digits of the number
	const lastTwoDigits = num % 100;

	// Special cases for 11, 12, and 13
	if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
		return 'th';
	}

	// Otherwise, determine the suffix based on the last digit
	switch (lastDigit) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};

/**
 * Trims the team prefix from a start.gg entrant name or other string.
 * @param str The tag or string to trim
 * @returns The new string without the prefix
 */
export const trimNamePrefix = (str: string): string => {
	const pipeIndex = str.indexOf('|');
	if (pipeIndex !== -1) {
		return str.slice(pipeIndex + 1).trim();
	}
	// Return the original string if pipe character is not found
	return str.trim();
};
