import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../Error/Error';

const ErrorPage = () => {
	return (
		<ErrorBoundary
			fallback={<Error />}
			onError={() => {
				console.error('A fatal error has occurred');
			}}
		>
			<Outlet />
		</ErrorBoundary>
	);
};

export default ErrorPage;
