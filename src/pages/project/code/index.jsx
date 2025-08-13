import { useState, useEffect, useCallback } from 'react';
import {
	ReactFlow,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useParams } from "react-router-dom";

import Explorer from './Explorer.jsx';

const CodePage = () => {
	const { id, file } = useParams();

	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);

	const [rfInstance, setRfInstance] = useState(null);

	useEffect(() => {
		(async () => {
			const result = await window.electronAPI.loadJson(file);
			if (result.success && result.data) {
				console.log(result.data)
				setNodes(result.data["nodes"]);
				setEdges(result.data["edges"]);

				console.log(result.data)
			} else {
				setNodes([]);
				setEdges([]);
			}
		})();
	}, [file]);

	const saveFile = async () => {
		const result = await window.electronAPI.saveJson({
			[file]: rfInstance.toObject()
		});
	};

	const onSave = useCallback(() => {
		if (rfInstance) {
			const flow = rfInstance.toObject();
			console.log(flow)
		}
	}, [rfInstance]);

	const onNodesChange = useCallback(
		(changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[]
	);

	const onEdgesChange = useCallback(
		(changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[]
	);

	const onConnect = useCallback(
		(params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[]
	);

	return (
		<div className="flex-row-between code_page">
			<Explorer />
			<div id="code_section">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onInit={setRfInstance}
					fitView
					style={{background: "#F8F8F8"}}
				>
					<Background />
					<Panel position="top-right" className="flex-row">
						<button onClick={() => {}}>
							restore
						</button>
						<button onClick={saveFile}>
							save
						</button>
						{/* <button className="xy-theme__button" onClick={onAdd}> */}
						{/* 	add node */}
						{/* </button> */}
					</Panel>
				</ReactFlow>
			</div>
		</div>
	);
}

export default CodePage;







