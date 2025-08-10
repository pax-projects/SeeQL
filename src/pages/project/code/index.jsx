import { useState, useCallback } from 'react';
import {
	ReactFlow,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Explorer from './Explorer.jsx';

const initialNodes = [{ id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }
}, {
	id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' }
}];

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const CodePage = () => {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const [rfInstance, setRfInstance] = useState(null);

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
						<button onClick={onSave}>
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