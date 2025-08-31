import { useState, useEffect, cloneElement } from "react";

import HandleWithValidation from "./HandleWithValidation";
import InputAutosize from "./InputAutosize";

const MultiFieldsComponent = ({ children, defaultValues, placeholder, handlesID, nodeID, onUpdate }) => {
	const [fields, setFields] = useState(
		defaultValues?.length > 0 // IF: Avoid empty list
		? defaultValues // THEN: Get the list
		: new Array({ id: 0, value: "" }) // ELSE: Create a new field
	);

	// Getting latest id + 1
	const [fieldID, setFieldID] = useState(
		1 + + [...fields].sort((x, y) => y.id - x.id)[0].id // Copying fields, sortig them (DESC) and taking the first one (with the higher id)
	);

	useEffect(() => {
		if (fields.length <= 0) return;

		onUpdate(fields);
	}, [fields]);

	const addCol = (e) => {
		e.preventDefault();

		setFieldID(fieldID+1);

		setFields([...fields, {
				id: fieldID,
				value: '',
			}
		]);
	}

	const delCol = (e, id) => {
		e.preventDefault();

		if (fields.length <= 1) return;

		setFields(
			[...fields].filter(obj => obj.id != id)
		);
	}

	const handleInputUpdate = (e, id) => {
		const field = fields.find(n => n.id === id);
		field.value = e.target.value;

		if (fields.length <= 0) return;

		onUpdate(fields);
	}

	return (
		<div className="flex-col rows">
			{
				fields.map(field =>
					<div className="flex-row" key={field.id}>
						<div className="flex-row nodrag row">
							<HandleWithValidation type="target" position="left" nodeID={nodeID} handleID={[`${handlesID}-${field.id}`, "listable-element-handle"]}/>

							<InputAutosize type="text" defaultValue={field.value} placeholder={placeholder} onInput={e => handleInputUpdate(e, field.id)} />
							{ fields.length > 1 && <button className="bin" onClick={(e) => delCol(e, field.id)}>-</button> }
						</div>
						{ children && cloneElement(children, {...children.props, id: field.id}) }
					</div>
				)
			}
			<button className="nodrag" onClick={addCol}>+</button>
		</div>
	);
}

export default MultiFieldsComponent;