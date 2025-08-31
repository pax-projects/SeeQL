/** DOC & WARNING
 * The code right below is a bit tricky...
 * For OrderByNode I had to add an ASC/DESC field for each column that the query will sort...
 * However, the MultiFieldsComponent wasn't made for...
 * So I passed it a children (the AscDescButton).
 * 
 * However (once again), each button has to be linked with the appropriate filed id...
 * So the MultiFieldsComponent clones the button and adds to it the ID props. (This is because only the MultiFieldsComponent knows which ID belongs to).
 * Moreover, to store and get values the AscDescButton needs to have a callback function from OrderByNode that give and store data dirrectly from the virtual JSON object given by props.
 * 
 * To finish, on EVERY update, the "fields" parameter is updated with the last values of the virtual JSON object. So it's not overwritten by any modification.
*/

import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";

import HandleWithValidation from "../components/HandleWithValidation";
import MultiFieldsComponent from "../components/MultiFieldsComponent";

const AscDescButton = ({ onClick, getValue, id }) => {
	if (id === undefined) return;

	const [isASC, setIsASC] = useState(getValue(id));

	const toogle = (e) => {
		setIsASC(!isASC);
		onClick(id, !isASC);
	}

	return (
		<button className="ascDesc" onClick={toogle}>{isASC ? "ASC" : "DESC"}</button>
	);
}

const OrderByNode = (props) => {
	const update = useCallback((fields) => {
		props.data["handleRules"] = {
			source: "single",
			target: "multiple"
		};

		fields.forEach(field => {
			field.isAsc = getAscDesc(field.id);
		});

		props.data["fields"] = fields;
	}, []);

	// Update AscDescButton value dirrectly in the JSON data field (according to id)
	const updateAscDesc = useCallback((id, isASC) => {
		props.data["fields"]?.forEach(storedField => {
			if (storedField.id == id) {
				storedField.isAsc = isASC;
			}
		});
	});

	// Get AscDescButton value from the JSON data field
	const getAscDesc = useCallback((id) => {
		let res = true; // Also sets true when the value is undefined

		props.data["fields"]?.forEach(storedField => {
			if (storedField.id == id) {
				res = storedField.isAsc;
			}
		});

		return res;
	});

	return (<div className="order-by-node query-node node">
		<div className="flex-row-between node-name">
			<HandleWithValidation type="target" position="left" nodeID={props.id} handleID={["order-by-handle", "input"]}/>
			<h3>ORDER BY</h3>
			<HandleWithValidation type="source" position="right" nodeID={props.id} handleID={["order-by-handle", "output"]}/>
		</div>
		<MultiFieldsComponent
			defaultValues={props.data?.fields}
			placeholder="column_name"
			nodeID={props.id}
			handlesID={"order-by-condition-handle"}
			onUpdate={update}
		>
			<AscDescButton onClick={updateAscDesc} getValue={getAscDesc} />
		</MultiFieldsComponent>
	</div>);
}


function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}

export default memo(OrderByNode, areEqual);