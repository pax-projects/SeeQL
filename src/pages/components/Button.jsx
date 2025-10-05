import { Link } from "react-router-dom";

import "../../styles/components/buttons.scss";

const Button = ({to, content}) => {
	return (
		<Link to={to}>
			<button className="default-button">{content}</button>
		</Link>
	);
}

export { Button };