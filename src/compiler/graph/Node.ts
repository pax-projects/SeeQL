enum NodeTypes {
	SELECT = "select",
	INSERT = "insert",
	UPDATE = "update",
	DELETE = "delete",
	JOIN_ON = "join",
	FROM = "from",
	WHERE = "where",
	GROUP_BY = "group_by",
	LIMIT = "limit",
	ORDER_BY = "order_by"
};

class Node {
	#id: string;
	#type: NodeTypes;
	#data: any;

	#next: Node;
	#before: Node;

	constructor(id: string, type: NodeTypes, data: any) {
		this.#id = id;
		this.#type = type;

		this.#data = data;

		this.#next = null;
		this.#before = null;
	}

	// Getters
	getID() { return this.#id; }
	getType() { return this.#type; }
	getData() { return this.#data; }

	getNext() { return this.#next; }

	hasBefore(): boolean { return this.#before != null; }
	hasNext(): boolean { return this.#next != null; }

	// Setters
	setBefore(before: Node) {
		this.#before = before;
	}

	setNext(next: Node) {
		this.#next = next;
	}
}

export { Node, NodeTypes };