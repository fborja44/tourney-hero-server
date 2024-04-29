import logger from "./logger.ts";

/**
 * Signal handler for ending the process.
 */
export const signalHandler = () => {
	logger.warn(`Process has been terminated. Closing server...`);
	process.exit();
};