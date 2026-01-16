import { Parser } from "node-sql-parser";

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

		console.log("ROOT", root);

		const statement = [
			`SELECT`,
			GraphParser.#processColumns(root.getData().fields),
			GraphParser.#getFromBlock(flatten_nodes.get("from")),
			GraphParser.#getJoinOnBlock(flatten_nodes.get("join")),
			GraphParser.#getWhereBlock(flatten_nodes.get("where")),
			GraphParser.#getGroupByBlock(flatten_nodes.get("groupBy")),
			GraphParser.#getHavingBlock(flatten_nodes.get("having")),
			GraphParser.#getOrderByBlock(flatten_nodes.get("order_by")),
			GraphParser.#getLimitBlock(flatten_nodes.get("limit")),
		]
		.filter(datum => datum != null)
		.join(' ');

		console.log(statement);

		const parser = new Parser();
		const ast = parser.astify(statement);

		return ast;
	}

	// Substatements
	static #getFromBlock(block: Node) {
		if (!block) return null;

		const data = [block.getData().field]
		.filter(datum => !!datum);

		return `FROM ${data}`;
	}

	static #getJoinOnBlock(block: Node) {
		if (!block) return null;

		const conditions = block.getData().fields.conditions
		.filter(datum => !!datum)
		.map(datum => datum.value)
		.join(" AND ");

		const table = block.getData().fields.table;

		return `JOIN ${table} ON ${conditions}`;
	}

	static #getWhereBlock(block: Node) {
		if (!block) return null;

		const data = block.getData().fields
		.filter(datum => !!datum)
		.map(datum => datum.value)
		.join(" AND ");

		return `WHERE ${data}`;
	}

	static #getGroupByBlock(block: Node) {
		if (!block) return null;

		const data = block.getData().fields
		.filter(datum => !!datum)
		.map(datum => datum.value)
		.join(", ");

		return `GROUP BY ${data}`;
	}

	static #getHavingBlock(block: Node) {
		if (!block) return null;

		const data = block.getData().fields
		.filter(datum => !!datum)
		.map(datum => datum.value)
		.join(" AND ");

		return `HAVING ${data}`;
	}

	static #getOrderByBlock(block: Node) {
		if (!block) return null;

		return `ORDER BY ${null}`;
	}

	static #getLimitBlock(block: Node) {
		if (!block) return null;

		return `LIMIT ${null}`;
	}

	// Expressions
	static #processColumns(columns: Array<{[id: Number]: string}>) {
		if (!columns) return null;

		let res = [];

		for (const elm of columns) {
			res.push(elm.value);
		}

		res = res.filter(datum => !!datum);

		return res.join(', ');
	}
}

export { GraphParser };