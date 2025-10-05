import { motion, useInView } from 'framer-motion';

// Components
import { TextFade } from "../components/TextFade";
import { Button } from "../components/Button";

import "../../styles/landing.scss";

const Landing = () => {
	return (
		<div id="landing" className="flex-col-around">
			<div>
				<TextFade directionY="up">
					<h1>Welcome on<br/><span className="text-purple">SeeQL</span></h1>
					<h3>A visual editor for your SQL projects</h3>
				</TextFade>
			</div>
			<Button to="/home" content="Start working" />
		</div>
	);
}

export default Landing;