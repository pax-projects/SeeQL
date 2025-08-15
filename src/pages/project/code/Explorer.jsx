import { useState } from "react";
import { useParams } from "react-router-dom";
// import { Tree } from "react-arborist";

import table_icon from "../../../assets/icons/table.svg";
import column_icon from "../../../assets/icons/column.svg";
import file_icon from "../../../assets/icons/file.svg";
import indexes from "../../../assets/icons/bookmark.svg";
import foreign_keys from "../../../assets/icons/foreign-key.svg";
import processes from "../../../assets/icons/cpu.svg";

import database from "../../../assets/icons/database.svg";
import sql_file from "../../../assets/icons/sql_file.svg";

import Hierarchy from "../../components/Hierarchy";

const Explorer = () => {
	const { id } = useParams();

	const [tables, setTables] = useState([{
		name: "Tables",
		icon: table_icon,
		linkable: false,
		children: [{
			name: "first_table",
			icon: table_icon,
			linkable: true,
			children: [
			{
				name: "Columns",
				icon: column_icon,
				linkable: false,
				children: [{
					name: "file_1",
					icon: null,
					linkable: false,
				},
				{
					name: "file_2",
					icon: null,
					linkable: false,
				}]
			}, {
				name: "Indexes",
				icon: indexes,
				linkable: false,
				children: [{
					name: "file_1",
					icon: null,
					linkable: false,
				},
				{
					name: "file_2",
					icon: null,
					linkable: false,
				}]
			}, {
				name: "FK",
				title: "Foreign keys",
				icon: foreign_keys,
				linkable: false,
				children: [{
					name: "file_1",
					icon: null,
					linkable: false,
				},
				{
					name: "file_2",
					icon: null,
					linkable: false,
				}]
			}, {
				name: "Processes",
				icon: processes,
				linkable: false,
				children: [{
					name: "file_1",
					icon: null,
					linkable: false,
				},
				{
					name: "file_2",
					icon: null,
					linkable: false,
				}]
			}]
		}, {
			name: "second_table",
			icon: table_icon,
			linkable: true,
			children: []
		}, {
			name: "third_table",
			icon: table_icon,
			linkable: true,
			children: []
		}]
	}]);

	const [queries, setQueries] = useState([{
		name: "Queries",
		icon: database,
		children: [{
			name: "add user",
			icon: sql_file,
			linkable: true,
		}, {
			name: "soft-delete user",
			icon: sql_file,
			linkable: true,
		}, {
			name: "hard-delete user",
			icon: sql_file,
			linkable: true,
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
