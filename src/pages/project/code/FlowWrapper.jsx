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

import TablePanel from './components/TablePanel.jsx';

// SQL Nodes
import SQLTableNode from "./components/nodes/tables/SQLTableNode";
import InsertNode from "./components/nodes/queries/InsertNode";
import SelectNode from "./components/nodes/queries/SelectNode";
import UpdateNode from "./components/nodes/queries/UpdateNode";
import DeleteNode from "./components/nodes/queries/DeleteNode";
import FromNode from "./components/nodes/queries/FromNode";
import JoinNode from "./components/nodes/queries/JoinNode";
import GroupByNode from "./components/nodes/queries/GroupByNode";
import HavingNode from "./components/nodes/queries/HavingNode";
import WhereNode from "./components/nodes/queries/WhereNode";
import OrderByNode from "./components/nodes/queries/OrderByNode";
import LimitNode from "./components/nodes/queries/LimitNode";

// Functions
// - Agregation
import AvgFunctionNode from "./components/nodes/functions/agregation/AvgFunctionNode";
import MaxFunctionNode from "./components/nodes/functions/agregation/MaxFunctionNode";
import MinFunctionNode from "./components/nodes/functions/agregation/MinFunctionNode";
import SumFunctionNode from "./components/nodes/functions/agregation/SumFunctionNode";
import CountFunctionNode from "./components/nodes/functions/agregation/CountFunctionNode";

// - Maths
import LogicalFunctionNode from "./components/nodes/functions/maths/LogicalFunctionNode";

// Others
import ListNode from "./components/nodes/queries/ListNode";

const nodeTypes = {
	table: SQLTableNode,
	insert: InsertNode,
	select: SelectNode,
	update: UpdateNode,
	delete: DeleteNode,
	from: FromNode,
	join: JoinNode,
	groupBy: GroupByNode,
	having: HavingNode,
	where: WhereNode,
	orderBy: OrderByNode,
	limit: LimitNode,

	// Functions:
	// - Agregation
	avg: AvgFunctionNode,
	max: MaxFunctionNode,
	min: MinFunctionNode,
	sum: SumFunctionNode,
	count: CountFunctionNode,

	// - Maths
	operator: LogicalFunctionNode,

	// Others
	list: ListNode
};

const primaryNodes = [
	"insert-handle",
	"select-handle",
	"update-handle",
	"delete-handle",
	"from-handle",
	"join-handle",
	"where-handle",
	"group-by-handle",
	"having-handle",
	"order-by-handle",
	"limit-handle"
];

const FlowWrapper = ({ nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, file }) => {
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

			params = {
				...params,
				markerEnd: {
					...params.markerEnd,
					type: MarkerType.ArrowClosed,
				},
				style: {
					...params.style
				}
			};
			// D80202
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
			type: "code",
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
			<Controls />
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

export default FlowWrapper;