import { useLocation, Link } from "react-router-dom";

const Header = () => {
	const location = useLocation();

	return (
		<header className="flex-col-between">
			<nav className="flex-row project_tabs">
				<Link to="/home" className={"tab_link" + (location.pathname.includes("home") ? " selected" : "")}>
					<div className="flex-row">
						<img src="/src/assets/icons/grid.svg" alt="overview-icon"/>
						<p>Project list</p>
					</div>
				</Link>
				<Link to="/settings" className={"tab_link" + (location.pathname.includes("settings") ? " selected" : "")}>
					<div className="flex-row">
						<img src="/src/assets/icons/settings.svg" alt="overview-icon"/>
						<p>Settings</p>
					</div>
				</Link>
			</nav>
		</header>
	);
}

export default Header;