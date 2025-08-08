import { useLocation, Link } from "react-router-dom";

const Header = () => {
	const location = useLocation();

	return (
		<header className="flex-col-between">
			<div className="project_url">
				
			</div>
			<nav className="flex-row project_tabs">
				<Link to="overview" className={"tab_link" + (location.pathname.includes("overview") ? " selected" : "")}>
					<div className="flex-row">
						<img src="/src/assets/icons/file-post.svg" alt="overview-icon"/>
						<p>Overview</p>
					</div>
				</Link>
				<Link to="docs" className={"tab_link" + (location.pathname.includes("docs") ? " selected" : "")}>
					<div className="flex-row">
						<img src="/src/assets/icons/book.svg" alt="overview-icon"/>
						<p>Docs</p>
					</div>
				</Link>
				<Link to="code" className={"tab_link" + (location.pathname.includes("code") ? " selected" : "")}>
					<div className="flex-row">
						<img src="/src/assets/icons/journal-code.svg" alt="overview-icon"/>
						<p>Code</p>
					</div>
				</Link>
				<Link to="tests" className={"tab_link" + (location.pathname.includes("tests") ? " selected" : "")}>
					<div className="flex-row">
						<img src="/src/assets/icons/cone.svg" alt="overview-icon"/>
						<p>Tests</p>
					</div>
				</Link>
				<Link to="tags" className={"tab_link" + (location.pathname.includes("tags") ? " selected" : "")}>
					<div className="flex-row">
						<img src="/src/assets/icons/tags.svg" alt="overview-icon"/>
						<p>Tags</p>
					</div>
				</Link>
				<Link to="settings" className={"tab_link" + (location.pathname.includes("settings") ? " selected" : "")}>
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