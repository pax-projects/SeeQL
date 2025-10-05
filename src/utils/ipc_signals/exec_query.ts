/**
 * Sending an IPC signal to Electron executing queries in back-end.
 * 
 * @param rootNodeID -- first node to start with
 * @param isSolo -- if true means only the targeted request will be executed
 * 					if false means the targeted request and the next ones following
 * 					the	connection order will be executed.
 * 
 * @return await 
*/
const execQuery = async (rootNodeID: string, project_name: string, isSolo: boolean = true) : Array<string> => {
	// 0: Check if solo / if has next

	const res = await window.electronAPI.execQuery({
		project_name: project_name,
		nodeID: rootNodeID
	});

	if (isSolo) return [res];

	const hasNext = false;

	if (!hasNext) return [res];

	return [res, ...execQuery(nextNode)];
}

export { execQuery };