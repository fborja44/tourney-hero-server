import bcrypt from 'bcrypt';
import readlineSync from 'readline-sync';
import fs from 'fs';
import { JoiPassword } from '@common/validator/JoiAuth.ts';
import { authFile } from './config/index.ts';

/**
 * Creates a prompt for a user.
 * @param prompt
 */
const createPrompt = (prompt: string, mask: string | undefined = undefined) => {
	return readlineSync.question(prompt, {
		hideEchoBack: mask !== undefined,
		mask: mask,
	});
};

/**
 * Sets a new password
 * @param password The password to encrypt
 */
const setPassword = (password: string) => {
	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			console.error('Error while setting new password.', err);
			return false;
		}

		// Write updated users list to the file
		fs.writeFileSync(
			authFile,
			JSON.stringify({ hashedPassword: hash }, null, 2),
			'utf-8'
		);

		console.log(`Successfully set a new password.`);
		return true;
	});
};

/**
 * Deletes the set password
 * @returns True if successful. Otherwise, false.
 */
const deletePassword = (): boolean => {
	if (!fs.existsSync(authFile)) {
		console.log('Password file not found.');
		return true;
	}

	// Remove the password
	fs.writeFileSync(authFile, JSON.stringify({}, null, 2), 'utf-8');
	console.log(`Successfully deleted password.`);
	return true;
};

const actions = ['set', 'delete'];

const main = () => {
	let action = createPrompt('Select an action: (set/delete) ');
	while (!actions.includes(action.toLowerCase())) {
		action = createPrompt('Select an action: (set/delete) ');
	}

	if (action.toLowerCase() === 'set') {
		let newPassword = createPrompt('Enter a password: ', '*');
		let passResult = JoiPassword.validate(newPassword);
		while (passResult.error) {
			console.log('Invalid password: ' + passResult.error.message);
			newPassword = createPrompt('Enter a password: ', '*');
			passResult = JoiPassword.validate(newPassword);
		}

		return setPassword(newPassword);
	} else if (action.toLowerCase() === 'delete') {
		return deletePassword();
	}
};

main();
