import '../css/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TickerPage } from './Pages/Frames/TickerFrame';
import GameplayPage from './Pages/GameplayPage';
import GameplayLANPage from './Pages/GameplayLANPage';
import PlayerCardPage from './Pages/PlayerCardPage';
import BracketPage from './Pages/BracketPage';
import BackgroundPage from './Pages/BackgroundPage';
import ErrorPage from './Pages/ErrorPage';
import Error from './Error/Error';
import CommentatorsPage from './Pages/CommentatorsPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ErrorPage />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <GameplayPage /> },
			{ path: '/LAN', element: <GameplayLANPage /> },
			{ path: '/commentators', element: <CommentatorsPage /> },
			{ path: '/player', element: <PlayerCardPage /> },
			{ path: '/bracket', element: <BracketPage /> },
			{ path: '/background', element: <BackgroundPage /> },
			{ path: '/ticker', element: <TickerPage /> },
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
