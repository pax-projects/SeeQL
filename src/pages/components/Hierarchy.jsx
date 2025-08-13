import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import "../../styles/components/hierarchy.scss";

const File = ({ nodes, depth, fullPath = "" }) => {
	const { id, file } = useParams();

	const root = `/project/${id}/code/`;

	return (
		<>
		{
			nodes.map((node) => {
				const path = `${fullPath}[${node.name.replace(" ", "-")}]`;

				return node.children ? (
					<details open style={{marginLeft: (depth > 0 ? "20px" : 0)}}>
						<summary className="flex-row">
							{ node.icon != null && <img src={node.icon} alt="icon"/> } {node.name}
						</summary>
						<File nodes={node.children} depth={depth + 1} fullPath={path}/>
					</details>
				) : (
					<Link to={root + path}>
						<div key={node.name} style={{minWidth: "fit-content"}} className={file == path ? "selected" : ""}>
							{ node.icon != null && <img src={node.icon} alt="icon"/> } {node.name}
						</div>
					</Link>
				)
			})}
		</>
	);
}

const Hierarchy = ({ files }) => {
	return (<>
		<File nodes={files} depth={0} />
	</>);
}

export default Hierarchy;