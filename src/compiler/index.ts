import { Parser } from "node-sql-parser";

import { Graph } from "./graph/Graph";

const queryGraphToCode = (userGraph: any) => {
	const parser = new Parser();

	const graph = new Graph(userGraph.nodes, userGraph.edges);
	const asts = graph.generateQueryASTs();
	console.log(asts);

	if (asts.length === 0) return;

	const sql = 'SELECT name, age FROM users WHERE age > 18 AND name IN ("Max", "Mey") AND x > 0 ORDER BY age DESC;';

	const ast = parser.astify(sql, { database: 'mysql' });
	console.log("ASTIFIED", ast);

	// console.log('AST:', JSON.stringify(ast, null, 2));

	// const backToSql = parser.sqlify(asts[0], { database: 'mysql' });
	// console.log('SQL rebuilt:', backToSql);
}

const codeToGraph = (sqlCode: string) => {
	const parser = new Parser();

	const ast = parser.astify(sqlCode, { database: 'mysql' });

	return ast;
}

export { queryGraphToCode, codeToGraph };