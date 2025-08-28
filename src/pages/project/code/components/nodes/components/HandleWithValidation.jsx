import { useState } from "react";
import { Handle } from "@xyflow/react";

const HandleWithValidation = ({ position, type, id, constraints }) => {
	return (
		<Handle
			type={type}
			position={position}
			isValidConnection={(connection) => {
				if (constraints === undefined) return true;

				for (const constraint of constraints) {
					for (const targetID of connection.targetHandle.split(',')) {
						if (targetID.includes(constraint)) return true;
					}
				}
			}}
			// onConnect={(params) => console.log(true)}
			id={String(id)}

			// className={isConnected ? "connected" : ""}
		/>
	);
}

export default HandleWithValidation;