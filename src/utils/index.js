

/**
 *
 * @param props react props object with key, value pairs
 * @param variableNames array of names, for ex. ['marginTop', 'marginBottom']
 * @returns a object such as {"--marginTop": "10px", "--marginBottom": "10px"}
 */
export function propsToCSSVariable(props, variableNames) {
	return variableNames.reduce((acc, key) => {
		if (props[key] !== undefined) {
			acc[`--${key}`] = props[key];
		}
		return acc;
	}, {});
}
