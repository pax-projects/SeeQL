import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

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
			<HandleWithValidation type="target" position="left" id={[props.id, "where-handle"]}/>
			<h3>WHERE</h3>
			<HandleWithValidation type="source" position="right" id={[props.id, "where-handle"]}/>
		</div>
		<MultiFieldsComponent
			defaultValues={props.data?.fields}
			placeholder="condition"
			handleID={[props.id, "where-condition-handle"]}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(WhereNode, areEqual);