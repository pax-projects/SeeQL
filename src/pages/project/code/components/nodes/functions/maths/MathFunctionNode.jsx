import { useState, useCallback, memo } from "react";

import HandleWithValidation from "../../components/HandleWithValidation";
import MonoFieldComponent from "../../components/MonoFieldComponent";

const connectionPoints = [
	"listable-element-handle",
	"unique-element-handle",
]

const MathlFunctionNode = (props) => {
	const operators = Object.freeze({
		PLUS: Symbol("+"),
		MINUS: Symbol("-"),
		TIMES: Symbol("*"),
		DIVIDED: Symbol("/"),
		POWER: Symbol("^")
	});

	const [operator, setOperator] = useState(operators.PLUS);

	const update = useCallback((field) => {
		props.data["handleRules"] = {
			source: "multiple",
			target: "multiple"
		};

		props.data["field"] = field;
	}, []);

	return (<div className="operator-func-node func-node node">
		<div className="node-name">
			<div className="flex-row-between">
				<h3>Logic operator ({operator.description})</h3>
				<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={"operator-function-handle"} constraints={connectionPoints}/>
			</div>
		</div>
		<MonoFieldComponent
			defaultValue={props.data?.field || ""}
			placeholder="column_name"
			nodeID={props.id}
			handleID={[props.id, "operator-func-column-name-first", "func-field-handle"]}
			onUpdate={update}
		/>
		<div className="operator-func">
			<select defaultValue={operator.description} onChange={(e) => setOperator(operators[e.target.value])}>
				{
					Object.entries(operators).map(([key, value]) => 
						<option value={key} key={key}>{value.description}</option>
					)
				}
			</select>
		</div>
		<MonoFieldComponent
			defaultValue={props.data?.field || ""}
			placeholder="column_name"
			nodeID={props.id}
			handleID={["operator-func-column-name-last", "func-field-handle"]}
			onUpdate={update}
		/>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(MathlFunctionNode, areEqual);