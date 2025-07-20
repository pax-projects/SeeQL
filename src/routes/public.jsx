import Landing from '../pages/landing/index';

import NotFound from '../pages/notFound';

export const publicRoutes = [{
	path: '/',
	element: <Landing />,
	errorElement: <NotFound />,
	children: [{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/home",
		element: <Landing />,
	}]
}];
