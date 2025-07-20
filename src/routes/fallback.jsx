import NotFound from '../pages/notFound';

export const fallbackRoute = [{
	path: '*',
	element: <NotFound />,
}];
