import Header from "../components/Header";
import Project from "./Project";

import "../../styles/home.scss";

const Home = () => {
	return (<div id="home">
		<Header />
		<div className="project-list">
			<Project/>
		</div>
	</div>);
}

export default Home;