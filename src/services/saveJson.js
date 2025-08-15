import fs from "fs";
import path from "path";
import { app } from "electron";

function saveJson(data) {
	// Base directory where all JSON files for this project will be stored
	// Example: <appPath>/user_data/sql_files/<project_name>
	let baseDir = path.join(app.getAppPath(), "user_data", "sql_files", data.project_name);

	// Ensure the directory exists (creates it recursively if needed)
	fs.mkdirSync(baseDir, { recursive: true });

	// Variables to store the final file path and the JSON key name
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
	const newData = { ...fileContent, [fileKey[0]]: data.data };

	// Write the merged data back to the file (pretty-printed with 2 spaces)
	fs.writeFileSync(targetFile, JSON.stringify(newData, null, 4), "utf-8");

	// Return the final path for reference
	return { success: true, path: targetFile };
}

export { saveJson };
