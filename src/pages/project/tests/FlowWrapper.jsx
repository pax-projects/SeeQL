import { useEffect, useCallback, useRef } from 'react';

import {
	ReactFlow,
	ReactFlowProvider,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	Controls,
	reconnectEdge,
	addEdge,
	MarkerType, // For Edges
	Panel,
	useReactFlow
} from '@xyflow/react';

// SQL Nodes
import TestNode from "/src/utils/nodes/test/TestNode";

const nodeTypes = {
	test: TestNode
};

const primaryNodes = [
	
];

const FlowWrapper = ({ nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange }) => {
	const { fitView, toObject } = useReactFlow();

	const edgeReconnectSuccessful = useRef(true);

	const onReconnectStart = useCallback(() => {
		edgeReconnectSuccessful.current = false;
	}, []);

	const onReconnect = useCallback((oldEdge, newConnection) => {
		edgeReconnectSuccessful.current = true;
		setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
	}, []);

	const onReconnectEnd = useCallback((_, edge) => {
		if (!edgeReconnectSuccessful.current) {
			setEdges((eds) => eds.filter((e) => e.id !== edge.id));
		}

		edgeReconnectSuccessful.current = true;
	}, []);

	const onConnect = useCallback(
		(params) => setEdges(prev => {
			const sourceNode = nodes.find(n => n.id === params.source);
			const handleRules = sourceNode?.data?.handleRules || {};
			const isSingle = handleRules.source === 'single';

			let newEdges = [...prev];

			if (isSingle) {
				newEdges = newEdges.filter(edge => edge.sourceHandle !== params.sourceHandle);
			}

			primaryNodes.forEach(primaryNode => {
				if (params.sourceHandle.includes(primaryNode)) {
					params = {
						...params,
						markerEnd: {
							...params.markerEnd,
							type: MarkerType.ArrowClosed,
							width: 10,
							height: 10,
							color: '#4000CD'
						},
						style: {
							...params.style,
							strokeWidth: 2,
							stroke: '#4000CD'
						}
					};
				}
			});

			return addEdge(params, newEdges);
		}),
		[setEdges, nodes]
	);

	const onTablePanelSubmit = useCallback((type, data) => {
		setNodes(prev => [...prev, data.node]);
	}, [setNodes]);

	// Save graph state to JSON
	const onSave = useCallback(async () => {
		await window.electronAPI.saveJson({
			project_name: "project_name",
			type: "test",
			data: toObject()
		});
	}, [toObject]);

	// Correctly reset viewport after nodes are applied
	useEffect(() => {
		if (nodes.length === 0) return;

		// Small timeout to wait for ReactFlow to render nodes
		const id = setTimeout(() => {
			fitView({ padding: 0.1 });
		}, 100); // 50ms is usually enough

		return () => clearTimeout(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const play = (e) => {
	// 	// TODO: Add a save
	// 	setState(states.RUNNING);

	// 	const result = await window.electronAPI.queryExec({
	// 		project_name: "project_name",
	// 		type: "code",
	// 		queries: toObject()
	// 	});

	// 	if (result.success && result.data) {
	// 		setNodes(result.data.nodes || []);
	// 		setEdges(result.data.edges || []);
	// 	} else {
	// 		setNodes([]);
	// 		setEdges([]);
	// 	}

	// 	setHasRun()
	};

	const playWithNext = (e) => {
		setState(states.RUNNING);
	};

	const stopPlaying = (e) => {
		setState(states.NONE);
	};

	const playAgain = (e) => {
		setState(states.RUNNING);
	};

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
			<Controls />
			<Background />
			<Panel position="top-right" className="flex-row">
				<button onClick={() => fitView()}>restore</button>
				<button onClick={onSave}>save</button>
			</Panel>
		</ReactFlow>
	);
};

export default FlowWrapper;
