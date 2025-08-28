import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

const connectionPoints = [
	"listable-element-handle"
]

const ListNode = (props) => {
	const [isOpen, setIsOpen] = useState(!!props.data?.isOpenState);

	const toogleOpen = () => {
		props.data["isOpenState"] = !isOpen;
		setIsOpen(!isOpen);
	}

	const update = useCallback((fields) => {
		props.data["handleRules"] = {
			source: "multiple",
		};

		props.data["fields"] = fields;
	}, []);

	return (<div className="list-node query-node node">
		<div className="flex-row-between node-name">
			<h3>List {!isOpen && <span>({props.data?.fields?.length} els)</span>}</h3>
			{
				isOpen
				? <img src="/src/assets/icons/collapse.svg" alt="collapse" onClick={(e) => {toogleOpen(); e.stopPropagation()}} />
				: <img src="/src/assets/icons/expand.svg" alt="expand" onClick={(e) => {toogleOpen(); e.stopPropagation()}} />
			}
			<HandleWithValidation type="source" position="right" id={[props.id, "list-node"]} constraints={connectionPoints}/>
		</div>
		{
			isOpen && <MultiFieldsComponent
				defaultValues={props.data?.fields}
				placeholder="element"
				handleID={[props.id, "where-condition-handle"]}
				onUpdate={update}
			/>
		}
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(ListNode, areEqual);