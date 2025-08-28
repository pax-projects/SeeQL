import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MonoFieldComponent from "../components/MonoFieldComponent";

const connectionPoints = [
	"where-handle",
	"join-handle"
]

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
			<HandleWithValidation type="target" position="left" id={[props.id, "from-handle"]}/>
			<h3>FROM</h3>
			<HandleWithValidation type="source" position="right" id={[props.id, "from-handle"]} constraints={connectionPoints}/>
		</div>
		<MonoFieldComponent
			defaultValue={props.data?.field}
			placeholder="table_name"
			handleID={[props.id, "from-table-name"]}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(FromNode, areEqual);