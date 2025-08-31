import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

const connectionPoints = [
	"order-by-handle",
	"limit-handle"
]

const HavingNode = (props) => {
	const update = useCallback((fields) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};

		props.data["fields"] = fields;
	}, []);

	return (<div className="having-node query-node node">
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" nodeID={props.id} handleID={["having-handle", "input"]}/>
			<h3>HAVING</h3>
			<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={["having-handle", "output"]} constraints={connectionPoints}/>
		</div>
		<MultiFieldsComponent
			defaultValues={props.data?.fields}
			placeholder="condition"
			nodeID={props.id}
			handlesID={"having-condition-handle"}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(HavingNode, areEqual);