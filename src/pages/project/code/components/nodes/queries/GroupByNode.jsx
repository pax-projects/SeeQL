import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

const connectionPoints = [
	"having-handle",
	"order-by-handle"
]

const GroupByNode = (props) => {
	const update = useCallback((fields) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};

		props.data["fields"] = fields;
	}, []);

	return (<div className="group-by-node query-node node">
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" nodeID={props.id} handleID={["group-by-handle", "input"]}/>
			<h3>GROUP BY</h3>
			<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={["group-by-handle", "output"]} constraints={connectionPoints}/>
		</div>
		<MultiFieldsComponent
			defaultValues={props.data?.fields}
			placeholder="column_name"
			nodeID={props.id}
			handlesID={"group-by-condition-handle"}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(GroupByNode, areEqual);