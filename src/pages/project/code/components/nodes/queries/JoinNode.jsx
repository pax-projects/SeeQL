import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";
// import { useUpdateNodeInternals } from "@xyflow/react";

import HandleWithValidation from "../components/HandleWithValidation";
import MonoFieldComponent from "../components/MonoFieldComponent";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

const connectionPoints = [
	"where-handle"
]

const JoinNode = (props) => {
	const fieldsType = Object.freeze({
		TABLE: Symbol("table"),
		CONDITIONS: Symbol("conditions"),
		JOIN: Symbol("join")
	});

	const update = useCallback((fieldType, fields) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};

		if (fieldType === fieldsType.TABLE) {
			props.data["fields"] = {
				...props.data["fields"],
				table: fields
			};
		}

		if (fieldType === fieldsType.CONDITIONS) {
			props.data["fields"] = {
				...props.data["fields"],
				conditions: fields
			};
		}

		if (fieldType === fieldsType.JOIN) {
			props.data["fields"] = {
				...props.data["fields"],
				joinType: fields
			};
		}
	}, []);

	return (<div className="join-node query-node node">
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" nodeID={props.id} handleID={["join-handle", "input"]}/>
			<h3>JOIN</h3>
			<select
				name="join-type"
				className="nodrag"
				defaultValue={props.data?.fields?.joinType}
				onChange={(e) => update(fieldsType.JOIN, e.target.value)}
			>
				<option value="inner">Inner</option>
				<option value="left">Left</option>
				<option value="right">Right</option>
				<option value="full">Full</option>
			</select>
			<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={["join-handle", "output"]} constraints={connectionPoints}/>
		</div>
		<div className="flex-col">
			<MonoFieldComponent
				defaultValue={props.data?.fields?.table}
				placeholder="table_name"
				nodeID={props.id}
				handleID={"join-table-name-handle"}
				onUpdate={(fields) => update(fieldsType.TABLE, fields)}
			/>
			<h3>ON</h3>
			<MultiFieldsComponent
				defaultValues={props.data?.fields?.conditions}
				placeholder="condition"
				nodeID={props.id}
				handlesID={"join-condition-handle"}
				onUpdate={(fields) => update(fieldsType.CONDITIONS, fields)}
			/>
		</div>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(JoinNode, areEqual);