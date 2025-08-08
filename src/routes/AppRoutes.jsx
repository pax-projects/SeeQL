import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public';
{/* import { privateRoutes } from './private'; */}
import { fallbackRoute } from './fallback';
import { ProtectedRoute } from '../modules/protectedRoute';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function AppRoutes() {
	const parseRouteObjects = (routes, isPrivate = false) => {
		return routes.map((route) => ({
			path: route.path,
			element: isPrivate
				? (<ProtectedRoute>{route.element}</ProtectedRoute>) 
				: (route.element),
			children: route.children
		}));
	};

	const publicRouteObjects = parseRouteObjects(publicRoutes);
	/* const privateRouteObjects = parseRouteObjects(privateRoutes, true); */
	/* const fallbackRouteObjects = parseRouteObjects(fallbackRoute); */

	const routes = [
		...publicRouteObjects,
		/* ...privateRouteObjects, */
		// ...fallbackRouteObjects,
	];

	const allRoutes = useRoutes(routes);

	return <>
		{allRoutes}
		<ToastContainer />
	</>;
}