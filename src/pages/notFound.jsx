import React from 'react';

import "./components/Button"

const NotFound = () => {
	return (
		<>
			<h1>ERROR 404</h1>
			<Button to="/home" content="Home" />
		</>
	);
}

export default NotFound;