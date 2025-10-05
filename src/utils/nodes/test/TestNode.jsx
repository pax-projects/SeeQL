import { useState, useCallback, memo } from "react";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

import { execQuery } from "../../ipc_signals/exec_query.ts";

const backwardConnectionPoints = [];

const forwardConnectionPoints = []

const TestNode = (props) => {
	const states = Object.freeze({
		NONE: Symbol("node"),
		SUCCESS: Symbol("success"),
		FAILED: Symbol("failed"),
		RUNNING: Symbol("running"),
		DID_NOT_RUN: Symbol("did_not_run")
	});

	const [state, setState] = useState(states.NONE);

	const [hasRun, setHasRun] = useState(false);

	const update = useCallback((fields) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};
	}, []);

	const play = async () => {
		const res = await execQuery(
			props.id,
			"project_name"
		);
	}

	const playWithNext = async () => {
		const res = await execQuery(
			props.id,
			"project_name",
			false
		);
	}

	return (<div className="test-node test-node node">
		<div className="node-color"></div>
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" nodeID={props.id} handleID={[props.data.name, "input"]}/>
			<div className="flex-row-between">
				<h3>{props.data.name} file_name</h3>
				<div className="flex-row">
					<button className="hidden icon" onClick={play}>
						<img src="/src/assets/icons/play.svg" alt=""/>
					</button>
					<button className="hidden icon" onClick={playWithNext}>
						<img src="/src/assets/icons/play-with-next.svg" alt=""/>
					</button>
				</div>
			</div>
			<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={[props.data.name, "output"]}/>
		</div>
		<div className="node-content">
			<div className="flex-row-between info">
				<p>Queries<br/>2</p>
				<p>Sub-query<br/>1</p>
				<p>Combined-query<br/>0</p>
			</div>
			<div className="result"></div>
		</div>
	</div>);
}

function areEqual(prevProps, nextProps) {
	return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(TestNode, areEqual);