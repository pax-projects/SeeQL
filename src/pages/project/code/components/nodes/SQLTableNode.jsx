import { useState, memo } from "react";
import { Handle } from "@xyflow/react";

// Exemple de data statique (idéalement tu passes ça en props)
const data = {
	name: "table",
	columns: [
		{
			name: "column_one",
			type: "int",
			constraints: ["pk", "ai", "nn"],
		},
		{
			name: "column_two",
			type: "float",
			constraints: ["uq", "nn"],
		},
	],
};

const SQLTableNode = ({ nodeData = data }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toogleOpen = () => setIsOpen(!isOpen);

	return (
		<div className="flex-col-between node table-node">
			<div className="flex-row-between node-name">
				<h3>{nodeData.name}</h3>
				{
					isOpen
					? <img src="/src/assets/icons/collapse.svg" alt="collapse" onClick={(e) => {toogleOpen(); e.stopPropagation()}} />
					: <img src="/src/assets/icons/expand.svg" alt="expand" onClick={(e) => {toogleOpen(); e.stopPropagation()}} />
				}
			</div>
			<div className="flex-col columns">
				<table>
					<tbody>
						{nodeData.columns.map((col) => (
							<tr key={col.name} className="column">
								<td className="column-name"><span>{col.name}</span></td>
								<td className="column-type"><span>{col.type}</span></td>
								{
									isOpen && <>
										<td className="column-constraint pk">
											{
												col.constraints.includes("pk") && <span title="Primary Key">PK</span>
											}
										</td>
										<td className="column-constraint ai">
											{
												col.constraints.includes("ai") && <span title="Auto Increment">AI</span>
											}
										</td>
										<td className="column-constraint nn">
											{
												col.constraints.includes("nn") && <span title="Not Null">NN</span>
											}
										</td>
										<td className="column-constraint uq">
											{
												col.constraints.includes("uq") && <span title="Unique">UQ</span>
											}
										</td>
										<td className="column-constraint zf">
											{
												col.constraints.includes("zf") && <span title="Zero Field">ZF</span>
											}
										</td>
									</>
								}
							</tr>
						))}
					</tbody>
				</table>
				
			</div>
		</div>
	);
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(SQLTableNode, areEqual);
