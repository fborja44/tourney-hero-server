import { createContext, useEffect, useState } from 'react';
import { PORT } from '../config/server';
import io, { Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
	updateBracket,
	updateCommentators,
	updateGameplay,
	updatePlayerCard,
} from '../redux/actions/dataActions';
import { OverlayData } from '@common/interfaces/Data';
import JoiOverlayData from '@common/validator/JoiOverlayData.ts';

interface SocketClientProviderProps {
	children: React.ReactNode;
}

interface SocketClientState {
	address: string;
	socket: Socket | null;
	connected: boolean;
}

const serverAddress = `http://localhost:${PORT || '3001'}`;

export const SocketClientContext = createContext<SocketClientState>({
	address: serverAddress,
	socket: null,
	connected: false,
});

/**
 * Socket.io setup
 * Initializes socket event listeners for communication
 * with the server
 */
const SocketClientProvider = ({ children }: SocketClientProviderProps) => {
	const [socketClient, setSocketClient] = useState<Socket | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('Establishing connection to server...');
		const socket = io(serverAddress, {
			auth: {
				perm: 'READ',
			},
		});
		socket.connect();
		setSocketClient(socket);
		setConnected(socket.connected);

		// Event listeners
		socket.on('connected', () => {
			console.log('Connected to server.');
			setConnected(true);
		});

		socket.on('connect', () => {
			console.log('Connected to server.');
			setConnected(true);
		});

		socket.on('reconnect', () => {
			console.log('Reconnected to server.');
			setConnected(true);
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from server.');
			socket.emit('disconnection');
			setConnected(false);
		});

		socket.on('updateState', (data: OverlayData) => {
			if (!data) return;
			const result = JoiOverlayData.validate(data);
			if (result.error) {
				console.error(result.error);
				return;
			}

			console.log(data);
			dispatch(updateGameplay(data.gameplay));
			dispatch(updateCommentators(data.commentators));
			dispatch(updateBracket(data.bracket));
			dispatch(updatePlayerCard(data.playerCard));
		});

		return () => {
			// Clean up socket connection when component unmounts
			socket.disconnect();
		};
	}, [dispatch]);

	const socketClientState: SocketClientState = {
		address: serverAddress,
		socket: socketClient,
		connected: connected,
	};

	return (
		<SocketClientContext.Provider value={socketClientState}>
			{children}
		</SocketClientContext.Provider>
	);
};

export default SocketClientProvider;
