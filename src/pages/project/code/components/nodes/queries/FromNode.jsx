import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MonoFieldComponent from "../components/MonoFieldComponent";

const backwardConnectionPoints = [
	"select-handle",
	"join-handle"
]

const forwardConnectionPoints = [
	"select-handle",
	"where-handle",
	"join-handle",
	"group-by-handle",
	"having-handle",
	"order-by-handle",
	"limit-handle"
];

const FromNode = (props) => {
	const update = useCallback((field) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};

		props.data["field"] = field;
	}, []);

	return (<div className="from-node query-node node">
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" nodeID={props.id} handleID={["from-handle", "input"]} constraints={backwardConnectionPoints}/>
			<h3>FROM</h3>
			<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={["from-handle", "output"]} constraints={forwardConnectionPoints}/>
		</div>
		<MonoFieldComponent
			defaultValue={props.data?.field}
			placeholder="table_name"
			nodeID={props.id}
			handleID={"from-table-name"}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(FromNode, areEqual);