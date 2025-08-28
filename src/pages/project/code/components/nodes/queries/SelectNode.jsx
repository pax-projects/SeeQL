import { useState, useCallback, memo } from "react";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

const connectionPoints = [
	"from-handle"
]

const SelectNode = (props) => {
	console.log(props)
	const update = useCallback((fields) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};

		props.data["fields"] = fields;
	}, []);

	return (<div className="select-node query-node node">
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" id={[props.id, "select-handle"]}/>
			<h3>SELECT</h3>
			<HandleWithValidation type="source" position="right" id={[props.id, "select-handle"]} constraints={connectionPoints}/>
		</div>
		<div className="flex-col rows">
			<MultiFieldsComponent
				defaultValues={props.data?.fields}
				placeholder="column_name"
				handlesID={[props.id, "select-column-handle"]}
				onUpdate={update}
			/>
		</div>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(SelectNode, areEqual);