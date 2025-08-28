import { useState, useEffect, useCallback } from 'react';
import {
	ReactFlowProvider,
	useNodesState,
	useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import "../../../styles/components/nodes.scss";

import { useParams } from "react-router-dom";

import Explorer from './Explorer.jsx';
import FlowWrapper from './FlowWrapper.jsx';

const CodePage = () => {
	const { file: fileParam } = useParams();
	const [file, setFile] = useState(fileParam);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useNodesState([]);

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
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						file={file}
					/>
				</ReactFlowProvider>
			</div>
		</div>
	);
};

export default CodePage;
