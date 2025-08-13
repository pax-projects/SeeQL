import { useState } from "react";
import { useParams } from "react-router-dom";
// import { Tree } from "react-arborist";

import table_icon from "../../../assets/icons/table.svg";
import column_icon from "../../../assets/icons/column.svg";
import file_icon from "../../../assets/icons/file.svg";
import database from "../../../assets/icons/database.svg";
import sql_file from "../../../assets/icons/sql_file.svg";

import Hierarchy from "../../components/Hierarchy";

const Explorer = () => {
	const { id } = useParams();

	const [tables, setTables] = useState([{
		name: "Tables",
		icon: table_icon,
		children: [{
			name: "first_table",
			icon: table_icon,
			children: [
			{
				name: "first_column",
				icon: column_icon,
				children: [{
					name: "file_1",
					icon: null,
				},
				{
					name: "file_2",
					icon: null,
				}]
			},
			{
				name: "second_column",
				icon: column_icon,
				children: [{
					name: "file_1",
					icon: null,
				},
				{
					name: "file_2",
					icon: null,
				}]
			}]
		}, {
			name: "second_table",
			icon: table_icon,
			children: []
		}, {
			name: "third_table",
			icon: table_icon,
			children: []
		}]
	}]);

	const [queries, setQueries] = useState([{
		name: "Queries",
		icon: database,
		children: [{
			name: "add user",
			icon: sql_file
		}, {
			name: "soft-delete user",
			icon: sql_file
		}, {
			name: "hard-delete user",
			icon: sql_file
		}]
	}]);

	return (
		<nav id="file_explorer" className="flex-col">
			<input type="text" placeholder="Search..."/>
			<div className="hierarchy">
				<Hierarchy files={tables} />
				<Hierarchy files={queries} />
			</div>
			{/* <Hierarchy files={queries} /> */}
		</nav>
	);
}

export default Explorer;
