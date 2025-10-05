import { useCallback, memo } from "react";

import HandleWithValidation from "../../components/HandleWithValidation";
import MonoFieldComponent from "../../components/MonoFieldComponent";

const connectionPoints = [
	"listable-element-handle",
	"unique-element-handle",
]

const SumFunctionNode = (props) => {
	const update = useCallback((field) => {
		props.data["handleRules"] = {
			source: "multiple",
			target: "multiple"
		};

		props.data["field"] = field;
	}, []);

	return (<div className="sum-func-node func-node node">
		<div className="node-name">
			<div className="flex-row-between">
				<h3>Sum</h3>
				<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={"sum-function-handle"} constraints={connectionPoints}/>
			</div>
		</div>
		<MonoFieldComponent
			defaultValue={props.data?.field || ""}
			placeholder="column(s)_name"
			nodeID={props.id}
			handleID={["sum-func-column-name", "func-field-handle"]}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(SumFunctionNode, areEqual);