import { useState, useEffect, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, Background, applyNodeChanges, applyEdgeChanges, addEdge, Panel, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import "../../../styles/components/nodes.scss";

import { useParams } from "react-router-dom";

import Explorer from './Explorer.jsx';
import TablePanel from './components/TablePanel.jsx';

// SQL Nodes
import SQLTableNode from "./components/nodes/SQLTableNode";

const nodeTypes = { table: SQLTableNode };

// Child component to use useReactFlow
const FlowWrapper = ({ nodes, edges, setNodes, setEdges, file }) => {
	const { fitView, toObject } = useReactFlow();

	const onNodesChange = useCallback(
		(changes) => setNodes(prev => applyNodeChanges(changes, prev)),
		[setNodes]
	);

	const onEdgesChange = useCallback(
		(changes) => setEdges(prev => applyEdgeChanges(changes, prev)),
		[setEdges]
	);

	const onConnect = useCallback(
		(params) => setEdges(prev => addEdge(params, prev)),
		[setEdges]
	);

	const onTablePanelSubmit = useCallback((type, data) => {
		setNodes(prev => [...prev, data.node]);
	}, [setNodes]);

	// Save graph state to JSON
	const onSave = useCallback(async () => {
		await window.electronAPI.saveJson({
			project_name: "project_name",
			file: file,
			data: toObject()
		});
	}, [file, toObject]);

	// Correctly reset viewport after nodes are applied
	useEffect(() => {
		if (nodes.length === 0) return;

		// Small timeout to wait for ReactFlow to render nodes
		const id = setTimeout(() => {
			fitView({ padding: 0.1 });
		}, 100); // 50ms is usually enough

		return () => clearTimeout(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]); // triggers only when file changes

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			nodeTypes={nodeTypes}
			fitView
			fitViewOptions={{ padding: 2 }}
			style={{ background: "#F8F8F8" }}
		>
			<Background />
			<Panel position="top-right" className="flex-row">
				<button onClick={() => fitView()}>restore</button>
				<button onClick={onSave}>save</button>
			</Panel>

			{file?.includes("[Tables]") && (
				<Panel position="bottom-center">
					<TablePanel onSubmit={onTablePanelSubmit} />
				</Panel>
			)}
		</ReactFlow>
	);
};

const CodePage = () => {
	const { file: fileParam } = useParams();
	const [file, setFile] = useState(fileParam);

	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);

	// Synchronize file with URL
	useEffect(() => {
		setFile(fileParam);
	}, [fileParam]);

	// Load data on file change
	useEffect(() => {
		if (!file) return;

		(async () => {
			const result = await window.electronAPI.loadJson({
				project_name: "project_name",
				file: file
			});

			if (result.success && result.data) {
				setNodes(result.data.nodes || []);
				setEdges(result.data.edges || []);
			} else {
				setNodes([]);
				setEdges([]);
			}
		})();
	}, [file]);

	return (
		<div className="flex-row-between code_page">
			<Explorer />
			<div id="code_section">
				<ReactFlowProvider>
					<FlowWrapper
						nodes={nodes}
						edges={edges}
						setNodes={setNodes}
						setEdges={setEdges}
						file={file}
					/>
				</ReactFlowProvider>
			</div>
		</div>
	);
};

export default CodePage;
