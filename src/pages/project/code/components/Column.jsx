import { Reorder, motion, useDragControls } from "framer-motion";

const Column = ({ col, index, form }) => {
	const { register, handleSubmit, getValues } = form;

	const controls = useDragControls();

	return (
		<Reorder.Item
			key={col.name}
			value={col}
			dragListener={false}
			dragControls={controls}
			className="flex-row-between row-item"
		>
			<img src="/src/assets/icons/grip-vertical.svg" alt="Drag here" className="reorder-handle" onPointerDown={(e) => { e.preventDefault(); controls.start(e)}} />
			<input type="text" defaultValue={col.name} {...register(`columns.${index}.name`)} />
			<input type="text" defaultValue={col.type} {...register(`columns.${index}.type`)} />
			<div className="flex-row checkboxes">
				<input type="checkbox" defaultChecked={col.pk} {...register(`columns.${index}.pk`)}/>
				<input type="checkbox" defaultChecked={col.ai} {...register(`columns.${index}.ai`)}/>
				<input type="checkbox" defaultChecked={col.nn} {...register(`columns.${index}.nn`)}/>
				<input type="checkbox" defaultChecked={col.uq} {...register(`columns.${index}.uq`)}/>
				<input type="checkbox" defaultChecked={col.zf} {...register(`columns.${index}.zf`)}/>
			</div>
			<input type="text" defaultValue={col.default} {...register(`columns.${index}.default`)} />
		</Reorder.Item>
	);
}

export default Column;