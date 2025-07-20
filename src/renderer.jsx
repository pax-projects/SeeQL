import { createRoot } from "react-dom/client";

import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

import "./styles/global.scss";

const App = () => {
	return ;
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<AppRoutes />
	</BrowserRouter>
);