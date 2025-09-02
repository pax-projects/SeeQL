import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

const backwardConnectionPoints = [
	"from-handle",
	"join-handle",
	"using-handle"
];

const forwardConnectionPoints = [
	"group-by-handle",
	"having-handle",
	"order-by-handle",
	"limit-handle"
];

const WhereNode = (props) => {
	const update = useCallback((fields) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};

		props.data["fields"] = fields;
	}, []);

	return (<div className="where-node query-node node">
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" nodeID={props.id} handleID={["where-handle", "input"]} constraints={backwardConnectionPoints}/>
			<h3>WHERE</h3>
			<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={["where-handle", "output"]} constraints={forwardConnectionPoints}/>
		</div>
		<MultiFieldsComponent
			defaultValues={props.data?.fields}
			placeholder="condition"
			nodeID={props.id}
			handlesID={"where-condition-handle"}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(WhereNode, areEqual);