import { useState, useEffect, useCallback } from 'react';
import {
	ReactFlowProvider,
	useNodesState,
	useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import "../../../styles/components/nodes.scss";

import { useParams } from "react-router-dom";

import FlowWrapper from './FlowWrapper.jsx';

const Tests = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useNodesState([]);

	// Load data on file change
	useEffect(() => {

		(async () => {
			const result = await window.electronAPI.loadJson({
				project_name: "project_name",
				type: "test"
			});

			console.log(result)

			if (result.success && result.data) {
				setNodes(result.data.nodes || []);
				setEdges(result.data.edges || []);
			} else {
				setNodes([]);
				setEdges([]);
			}
		})();
	}, []);

	return (
		<div className="flex-row-between test_page">
			<div id="test_section">
				<ReactFlowProvider>
					<FlowWrapper
						nodes={nodes}
						edges={edges}
						setNodes={setNodes}
						setEdges={setEdges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
					/>
				</ReactFlowProvider>
			</div>
		</div>
	);
};

export default Tests;
