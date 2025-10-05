import { Node } from "./Node.ts";

class GraphParser {
	static #generator(root: Node) {
		let node: Node = root;

		const flatten_nodes = new Map();

		while (node) {
			flatten_nodes.set(node.getType(), node);
			node = node.getNext();
		}

		return flatten_nodes;
	}

	static genFrom(root: Node) {
		if (root.getType() === "select") return GraphParser.#genSelect(root);
	}

	// Statements
	static #genSelect(root: Node) {
		const flatten_nodes = GraphParser.#generator(root);

		console.log(root)

		const selectStatement = {
			with: null,
			type: "select",
			options: null,
			distinct: null,
			columns: GraphParser.#processColumns(root.getData().fields),
			from: GraphParser.#getFromBlock(flatten_nodes.get("from")),
			where: GraphParser.#getWhereBlock(flatten_nodes.get("where")),
			groupby: GraphParser.#getGroupByBlock(flatten_nodes.get("group_by")),
			having: GraphParser.#getHavingBlock(flatten_nodes.get("having")),
			orderby: GraphParser.#getOrderByBlock(flatten_nodes.get("order_by")),
			limit: GraphParser.#getLimitBlock(flatten_nodes.get("limit")),
		}

		// TODO: Check error in selectStatement

		return selectStatement;
	}

	// Substatements
	static #getFromBlock(block: Node) {
		if (!block) return null;

		let data = [block.getData().field]
		.map(datum => {
			const new_datum = datum.split(/ as /i);

			return {
				table: new_datum[0],
				as: new_datum.length === 2 ? new_datum[1] : null
			};
		});

		console.log("FROM-DATA", data);

		return [{
			"db": null,
			"table": data[0].table,
			"as": data[0].as
		}];
	}

	static #getWhereBlock(block: Node) {
		if (!block) return null;

		return {};
	}

	static #getGroupByBlock(block: Node) {
		if (!block) return null;

		return {};
	}

	static #getHavingBlock(block: Node) {
		if (!block) return null;

		return {};
	}

	static #getOrderByBlock(block: Node) {
		if (!block) return null;

		return {};
	}

	static #getLimitBlock(block: Node) {
		if (!block) return null;

		return {};
	}

	// Expressions
	static #processColumns(columns: Array<{[id: Number]: string}>) {
		if (!columns) return null;

		const res = [];

		for (const elm of columns) {
			res.push({
				expr: {
					type: "column_ref",
					table: null,
					column: elm.value
				},
				as: null,
			});
		}

		return res;
	}
}

export { GraphParser };