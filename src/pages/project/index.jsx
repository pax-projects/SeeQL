import { useLocation, Outlet } from "react-router-dom";

import Header from './Header';

import "../../styles/project.scss";

const Project = () => {
	const location = useLocation();

	return (
		<div id="project">
			<Header />

			<Outlet />
		</div>
	);
}

export default Project;