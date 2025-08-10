import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactFlowProvider, ReactFlow, useReactFlow } from "@xyflow/react";

const initialNodes = [
	{ id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
	{ id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];

const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

function FlowContent() {
	const [nodes] = useState(initialNodes);
	const [edges] = useState(initialEdges);

	const { fitView } = useReactFlow();

	useEffect(() => {
		fitView({ padding: 0.2 });
	}, [fitView]);

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			nodesDraggable={false}
			nodesConnectable={false}
			elementsSelectable={false}
			panOnDrag={false}
			panOnScroll={false}
			zoomOnScroll={false}
			zoomOnPinch={false}
			style={{ background: "#FDFDFD" }}
		/>
	);
}

const Project = ({ isRecent }) => {
	const navigate = useNavigate();

	return (
		<div
			className={"flex-col-between project" + (isRecent ? " big" : "")}
			onClick={() => navigate("/project/0/overview")}
			style={{ cursor: "pointer" }}
		>
			<div className="map" style={{ height: 300, width: "100%" }}>
				<ReactFlowProvider>
					<FlowContent />
				</ReactFlowProvider>
			</div>
			<div className="banner">
				<p>Project name</p>
			</div>
		</div>
	);
};

export default Project;
