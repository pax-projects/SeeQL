import Landing from '../pages/landing/index';

import Home from '../pages/home/index';

import Project from '../pages/project/index';
import Overview from '../pages/project/overview/index';
import Docs from '../pages/project/docs/index';
import CodePage from '../pages/project/code/index';
import Tests from '../pages/project/tests/index';
import Tags from '../pages/project/tags/index';
import Settings from '../pages/project/settings/index';

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
		path: "/landing",
		element: <Landing />,
	}]
}, {
	path: '/home',
	element: <Home />,
	errorElement: <NotFound />
}, {
	path: '/project/:id',
	element: <Project />,
	errorElement: <NotFound />,
	children: [{
		path: "overview",
		element: <Overview />
	}, {
		path: "docs",
		element: <Docs />
	}, {
		path: "code/",
		element: <CodePage />,
	}, {
		path: "code/:file",
		element: <CodePage />,
	}, {
		path: "code/:file",
		element: <CodePage />,
	}, {
		path: "tests",
		element: <Tests />
	}, {
		path: "tags",
		element: <Tags />
	}, {
		path: "settings",
		element: <Settings />
	}]
}];
