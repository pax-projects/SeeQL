import { Node, NodeTypes } from "./Node.ts"; 

import { GraphParser } from "./GraphParser.ts"; 

interface NodeI {
	id: string,
	type: string,
	data: any
};

interface EdgeI {
	source: string,
	target: string
};

class Graph {
	#roots: Array<Node>;
	#nodes: Array<NodeI>;
	#edges: Array<EdgeI>;

	constructor(nodes: Array<NodeI>, edges: Array<EdgeI>) {
		this.#nodes = nodes;
		this.#edges = edges;

		this.createGraph();
	}

	createGraph() {
		const nodes: Array<Node> = [];

		// Get all nodes
		this.#nodes.forEach(node => {
			nodes.push(
				new Node(
					node.id,
					node.type,
					node.data
				)
			);
		});

		// Link nodes
		this.#edges.forEach(edge => {
			if (
				!edge.sourceHandle.split(',').includes('output') ||
				!edge.targetHandle.split(',').includes('input')
			) return;

			const sourceNode: Node = nodes.filter(node => (node.getID() === edge.source))[0];
			const targetNode: Node = nodes.filter(node => (node.getID() === edge.target))[0];

			sourceNode.setNext(targetNode);
			targetNode.setBefore(sourceNode);
		});

		// Delete all start nodes
		this.#roots = nodes.filter(node => 
			!node.hasBefore() &&
			["select", "delete", "update", "insert"].includes(node.getType().toString())
		);
	}

	generateQueryASTs() {
		const asts = [];

		for (const root of this.#roots) {
			asts.push(GraphParser.genFrom(root));
		}

		return asts;
	}
}

export { Graph };