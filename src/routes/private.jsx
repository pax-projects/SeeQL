import App from '../App'; // Basefile

import LogUp from '../pages/logUsers/logUp';

import Home from '../pages/home/home';
import Calendar from '../pages/calendar/calendar';
import SeatingPlan from '../pages/seatingPlan/seatingPlan';
import Settings from '../pages/settings/settings';
import Logs from '../pages/logs/logs';

import NotFound from '../pages/notFound';

export const privateRoutes = [{
	path: '/',
	element: <App />,
	errorElement: <NotFound />,
	children: [{
		path: "/",
		element: <Home />,
	}, {
		path: "/home",
		element: <Home />,
	}, {
		path: '/calendar',
		element: <Calendar />,
	}, {
		path: '/seatingPlan',
		element: <SeatingPlan />,
	}, {
		path: '/settings',
		element: <Settings />,
	}, {
		path: '/logs',
		element: <Logs />,
	}]
}, {
	path: '/logup',
	element: <LogUp />,
	errorElement: <NotFound />
}];
