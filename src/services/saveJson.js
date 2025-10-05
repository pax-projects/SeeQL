import fs from "fs";
import path from "path";
import { app } from "electron";

function getBaseDir(segments) {
	return path.join(app.getAppPath(), "user_data", ...segments);
}

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

function handleCodeStorage(data, baseDir) {
	let targetFile;
	let fileKey;

	// Determine which JSON file to use based on the prefix in data.file
	if (data.file.startsWith("[Tables]")) {
		// Store in tables.json and remove the "[Tables]" tag from the key
		targetFile = path.join(baseDir, "tables.json");
		fileKey = data.file.replace("[Tables]", "")
	} else if (data.file.startsWith("[Queries]")) {
		// Store in queries.json and remove the "[Queries]" tag from the key
		targetFile = path.join(baseDir, "queries.json");
		fileKey = data.file.replace("[Queries]", "")
	} else {
		// Default: store in data.json with a cleaned-up key
		targetFile = path.join(baseDir, "data.json");
		fileKey = data.file
	}

	fileKey = fileKey.replace(/^\[|\]$/g, "");
	fileKey = fileKey.split("][");

	// Read existing JSON content if the file already exists
	const fileContent = (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 0)
		? JSON.parse(fs.readFileSync(targetFile, "utf-8"))
		: {};

	// Merge the new data into the existing JSON object
	let newData;
	if (fileKey[0] === '') {
		newData = { ...fileContent, ...data.data };
	} else {
		newData = { ...fileContent, [fileKey[0]]: data.data };
	}

	return [targetFile, newData]
}

function handleSettingsStorage(data, baseDir) {
	const targetFile = path.join(baseDir, "settings.json");

	return [targetFile, data.data];
}

function handleTestStorage(data, baseDir) {
	const targetFile = path.join(baseDir, "queries-test.json");

	return [targetFile, data.data];
}

function saveJson(data) {
	// TODO: Add sql_files folder if it's code
	if (data.type === "code") {
		const baseDir = getBaseDir([data.project_name, "sql_files"]); // Base directory where all JSON files for this project will be stored
		ensureDir(baseDir); // Ensure the directory exists (creates it recursively if needed)
		
		const [targetFile, newData] = handleCodeStorage(data, baseDir);

		// Write the merged data back to the file (pretty-printed with 2 spaces)
		fs.writeFileSync(targetFile, JSON.stringify(newData, null, 4), "utf-8");

		// Return the final path for reference
		return { success: true, path: targetFile };
	}

	if (data.type === "test") {
		const baseDir = getBaseDir([data.project_name, "sql_files"]);
		ensureDir(baseDir);

		const [targetFile, newData] = handleTestStorage(data, baseDir);

		fs.writeFileSync(targetFile, JSON.stringify(newData, null, 4), "utf-8");

		return { success: true, path: targetFile };
	}

	if (data.type === "settings") {
		const baseDir = getBaseDir([data.project_name]);
		ensureDir(baseDir);

		const [targetFile, newData] = handleSettingsStorage(data, baseDir);

		fs.writeFileSync(targetFile, JSON.stringify(newData, null, 4), "utf-8");

		return { success: true, path: targetFile };
	}
}

export { saveJson };
