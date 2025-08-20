import fs from "fs";
import path from "path";
import { app } from "electron";

function loadJson(data) {
	const baseDir = path.join(app.getAppPath(), "user_data", "sql_files", data.project_name);

	let targetFile;
	let fileKey;

	if (data.file.startsWith("[Tables]")) {
		targetFile = path.join(baseDir, "tables.json");
		fileKey = data.file.replace("[Tables]", "");
	} else if (data.file.startsWith("[Queries]")) {
		targetFile = path.join(baseDir, "queries.json");
		fileKey = data.file.replace("[Queries]", "");
	} else {
		targetFile = path.join(baseDir, "data.json");
		fileKey = data.file;
	}

	// Nettoyage et découpage
	fileKey = fileKey.replace(/^\[|\]$/g, "");
	fileKey = fileKey.split("][");

	// Si le fichier n’existe pas ou est vide → on retourne vide
	if (!fs.existsSync(targetFile)) {
		return { success: false, data: null };
	}

	if (fs.statSync(targetFile).size === 0) {
		return { success: true, data: null };
	}

	// Lecture et parsing
	const fileContent = JSON.parse(fs.readFileSync(targetFile, "utf-8"));

	console.log("FILE KEY:", fileKey);

	if (fileKey[0] === '') {
		return { success: true, data: fileContent }; // Table
	} else {
		return { success: true, data: fileContent[fileKey[0]] }; // Query
	}
}

export { loadJson };
