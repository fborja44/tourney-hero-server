import SocketClientProvider from '../socket/SocketClientProvider';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/store';

const AppProvider = () => {
	return (
		<ReduxProvider store={store}>
			<SocketClientProvider>
				<App />
			</SocketClientProvider>
		</ReduxProvider>
	);
};

export default AppProvider;
