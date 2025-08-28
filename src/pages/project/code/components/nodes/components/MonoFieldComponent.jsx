import HandleWithValidation from "./HandleWithValidation";

const MonoFieldComponent = ({ defaultValue, placeholder, handleID, onUpdate }) => {
	const handleInputUpdate = (e) => {
		onUpdate(e.target.value);
	}

	return (
		<div className="flex-row nodrag row">
			<HandleWithValidation type="target" position="left" id={[handleID, "unique-element-handle"]}/>
			<input type="text" defaultValue={defaultValue} placeholder={placeholder} onInput={handleInputUpdate}/>
		</div>
	);
}

export default MonoFieldComponent;