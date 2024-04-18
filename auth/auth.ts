import JoiAuth from '@common/validator/JoiAuth.ts';
import { authFile } from './config/index.ts';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import fs from 'fs';
import { Socket } from 'socket.io';
import { socketLog } from '../server/utils/logger.ts';

/**
 * Gets the password from config file.
 * @returns The password. Otherwise, returns the empty string.
 */
export const getPassword = (): string | null => {
	try {
		const data = fs.readFileSync(authFile, 'utf-8');
		// TODO: Verify structure of auth file
		return JSON.parse(data).hashedPassword ?? null;
	} catch (error) {
		return null;
	}
};

/**
 * Verifies password credentials.
 * @param password The password to verify.
 * @returns True if credentials are valid.
 * @throws Error on on invalid credentials or verification error
 */
export const verifyCredentials = async (password: string) => {
	return new Promise((resolve, reject) => {
		if (typeof password !== 'string') {
			return reject('Invalid credentials');
		}

		const authPassword = getPassword();
		if (authPassword === null) {
			// If password has not been set, passwordless auth
			return resolve(true);
		}

		bcrypt.compare(password, authPassword, (err, result) => {
			if (err) {
				return reject(err);
			}
			if (!result) {
				return reject('Invalid credentials');
			}
			return resolve(result);
		});
	});
};

/**
 * Authentication middleware to authenticate a socket.io client before connecting to the socket.io server.
 * Checks for requested permissions.
 * 'READ': Allowed to receive server data
 * 'WRITE': [Privileged] Allowed to receive server data and send data to server
 * @param socket The socket.io client
 * @param next Next function
 */
export const authenticateClient = async (socket: Socket, next: any) => {
	const result = JoiAuth.validate(socket.handshake.auth);
	if (result.error) {
		socketLog(
			socket,
			`Failed login attempt: Invalid auth: ${result.error.message}`,
			true
		);
		return next(new Error('Unauthorized.'));
	}

	const { password, perm } = socket.handshake.auth;

	// Check if permissions were provided
	if (perm !== 'READ' && perm !== 'WRITE') {
		socketLog(socket, `Failed login attempt: Invalid permission string`, true);
		return next(new Error('Unauthorized.'));
	}

	// If read-only allow
	if (perm === 'READ') {
		return next();
	}

	try {
		await verifyCredentials(password);
		return next();
	} catch (err) {
		socketLog(socket, `Failed login attempt: ${err}`, true);
	}
	return next(new Error('Unauthorized.'));
}