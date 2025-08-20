import { useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import "../../../../styles/components/hierarchy.scss";

const File = ({ nodes, depth, fullPath = "" }) => {
	const { id, file } = useParams();
	const navigate = useNavigate();

	const root = `/project/${id}/code/`;

	return (<>
		{
			nodes.map((node) => {
				const path = `${fullPath}[${node.name.replace(" ", "-")}]`;

				if (node.children) {
					return (
						<details
							key={path} // clé unique
							open={(file === path) || (node.name === "Queries") || (node.name === "Tables")}
							onClick={() => node.linkable && navigate(root + path)}
							className={file === path ? "selected" : ""}
							style={{ marginLeft: depth > 0 ? "20px" : 0 }}
						>
							<summary className="flex-row" title={node.title}>
								{node.icon && <img src={node.icon} alt="icon" />} {node.name}
							</summary>
							<File nodes={node.children} depth={depth + 1} fullPath={path} />
						</details>
					);
				}

				return (
					<div
						key={path} // idem ici
						style={{ minWidth: "fit-content", cursor: node.linkable ? "pointer" : "default" }}
						onClick={() => node.linkable && navigate(root + path)}
						className={file === path ? "selected" : ""}
					>
						{node.icon && <img src={node.icon} alt="icon" />} {node.name}
					</div>
				);
			})
		}
	</>);
}

const Hierarchy = ({ files }) => {
	return (<>
		<File nodes={files} depth={0} />
	</>);
}

export default Hierarchy;