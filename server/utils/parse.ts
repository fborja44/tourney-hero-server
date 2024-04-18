/**
 * Parses a socket client's remote address.
 * @param remoteAddress The remote address to parse.
 * @returns The parsed address.
 */
export const parseIp = (remoteAddress: string | undefined) => {
	const reg = /::ffff:/;
	let tempIp = remoteAddress || '';
	tempIp = tempIp.replace(reg, '');
	tempIp = '<' + tempIp + '>' + ' '.repeat(16 - tempIp.length);
	return tempIp;
};

/**
 * Parses a socket client's agent string to determine the type of client.
 * @param agentString The agent string to parse.
 * @returns The client type as a string.
 */
export const parseClientType = (agentString: string | undefined) => {
	const browserKeywords = [
        'Mozilla', 'AppleWebKit', 'Chrome', 'Safari', 'Firefox', 'Edge', 'Opera', 'MSIE', 'Trident'
    ];
	if (agentString?.includes('OBS')) {
		return 'OBS';
	}
	if (agentString?.includes('Electron')) {
		return 'Client';
	}
	if (browserKeywords.some(keyword => agentString?.includes(keyword))) {
		return 'Browser';
	}
	return 'Unknown';
};
