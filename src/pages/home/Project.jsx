import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactFlowProvider, ReactFlow, useReactFlow } from "@xyflow/react";

const Project = ({ isRecent }) => {
	const navigate = useNavigate();

	const [projects, setProjects] = useState([
		{}, {}, {}
	]);

	return (
		<div id="project">
			{
				projects.map(project =>
					<motion.div className="flex-row-between project" onClick={() => navigate('/project/0/code')}>
						<div className="flex-col">
							<h3 className="project__name">Project name</h3>
							<p className="project__description">Excepteur occaecat cillum deserunt labore fugiat consectetur.</p>
						</div>
						<button className="hidden icon" onClick={() => {}}>
							<img src="/src/assets/icons/dots.svg" alt="options"/>
						</button>
					</motion.div>
				)
			}
		</div>
	);
};

export default Project;
