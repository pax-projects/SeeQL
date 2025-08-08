import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import "../../styles/components/hierarchy.scss";

const File = ({ nodes, depth }) => {
	return (
		<>
		{
			nodes.map((node) => (
				node.children ? (
					<details open style={{marginLeft: (depth > 0 ? "20px" : 0)}}>
						<summary className="flex-row">
							{ node.icon != null && <img src={node.icon} alt="icon"/> } {node.name}
						</summary>
						<File nodes={node.children} depth={depth + 1} />
					</details>
				) : (
					<Link to={node.link}>
						<div key={node.name} style={{marginLeft: "22px", minWidth: "fit-content"}}>
							{ node.icon != null && <img src={node.icon} alt="icon"/> } {node.name}
						</div>
					</Link>
				)
			))}
		</>
	);
}

const Hierarchy = ({ files }) => {
	return (<>
		<File nodes={files} depth={0} />
	</>);
}

export default Hierarchy;