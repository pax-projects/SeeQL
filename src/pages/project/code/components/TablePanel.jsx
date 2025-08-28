import { useState } from "react";
import { Reorder, motion, useDragControls } from "framer-motion";
import { useForm } from "react-hook-form";

import Column from "./Column";

import "../../../../styles/components/tablePanel.scss";

const TablePanel = () => {
	// Exemple de données de colonnes
	const form = useForm({});
	const { register, handleSubmit, getValues } = form;

	const [columns, setColumns] = useState([
		{ id: 0, name: "id", type: "int", pk: true, ai: true, nn: true, uq: false, zf: false, default: "0" },
		{ id: 1, name: "username", type: "varchar(255)", pk: false, ai: false, nn: true, uq: true, zf: false, default: "" },
		{ id: 2, name: "email", type: "varchar(255)", pk: false, ai: false, nn: true, uq: true, zf: false, default: "" },
		{ id: 3, name: "password", type: "varchar(255)", pk: false, ai: false, nn: true, uq: true, zf: false, default: "" },
		{ id: 4, name: "created_at", type: "DATETIME", pk: false, ai: false, nn: true, uq: false, zf: false, default: "" },
		{ id: 5, name: "updated_at", type: "DATETIME", pk: false, ai: false, nn: true, uq: false, zf: false, default: "" },
		{ id: 6, name: "deleted_at", type: "DATETIME", pk: false, ai: false, nn: false, uq: false, zf: false, default: "" },
		{ id: 7, name: "created_by", type: "int", pk: false, ai: false, nn: true, uq: false, zf: false, default: "" },
		{ id: 8, name: "updated_by", type: "int", pk: false, ai: false, nn: true, uq: false, zf: false, default: "" },
		{ id: 9, name: "deleted_by", type: "int", pk: false, ai: false, nn: false, uq: false, zf: false, default: "" }
	]);

	return (<>
		<div id="table-panel" className="flex-col">
			<div className="flex-row-between thead">
				<p>Column name</p>
				<p>Column type</p>
				<p className="flex-col">
					Column constraints
					<span className="flex-row-between">
						<span>PK</span>
						<span>AI</span>
						<span>NN</span>
						<span>UQ</span>
						<span>ZF</span>
					</span>
				</p>
				<p>Column default value</p>
			</div>
			<div className="flex-col tbody">
				<Reorder.Group
					axis="y"
					values={columns}
					onReorder={setColumns}
					className="flex-col"
					layoutScroll
					style={{padding: 0, overflowY: "scroll", height: "170px"}}
				>
					{columns.map((col) => (
						<Column key={col.name} col={col} index={col.id} form={form} />
					))}
				</Reorder.Group>
			</div>
		</div>
		{/*<div id="table-panel" className="flex-col">
			<div className="flex-row-between thead">
				<p>Column name</p>
				<p>Datatype</p>
				<div className="flex-row">
					<p title="Primary key">PK</p>
					<p title="Auto increment">AI</p>
					<p title="Non nul">NN</p>
					<p title="Unique index">UQ</p>
					<p title="Fill with zero value (when numeric)">ZF</p>
				</div>
				<p>Default value</p>
			</div>

			<div className="tbody">
				
			</div>

			<button onClick={() => {}}>Create</button>
		</div> */}
	</>);
};

export default TablePanel;
