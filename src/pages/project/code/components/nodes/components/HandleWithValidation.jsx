import { useState, useEffect } from "react";
import { Handle, useNodeConnections } from "@xyflow/react";

const HandleWithValidation = ({ position, type, nodeID, handleID, constraints }) => {
	const [connNumber, setConnNumber] = useState(false);

	const connections = useNodeConnections({
		id: nodeID,
		handleId: String(handleID),
		type: type,

		onConnect: (params) => {

		},

		onDisconnect: (params) => {
			
		},
	});

	const isHandleConnected = connections.some(
		(conn) => conn.sourceHandle === String(handleID) || conn.targetHandle === String(handleID)
	);

	return (
		<Handle
			type={type}
			position={position}
			isValidConnection={(connection) => {
				if (constraints === undefined) return true;

				console.log(connection)

				for (const constraint of constraints) {
					// Forward connections
					for (const targetID of connection.targetHandle.split(',')) {
						if (targetID.includes(constraint)) return true;
					}

					for (const targetID of connection.sourceHandle.split(',')) {
						if (targetID.includes(constraint)) return true;
					}
				}
			}}
			id={String(handleID)}

			className={isHandleConnected ? "connected" : ""}
		/>
	);
}

export default HandleWithValidation;