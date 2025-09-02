import fs from "fs";
import path from "path";
import { app } from "electron";

function getBaseDir(segments) {
	return path.join(app.getAppPath(), "user_data", ...segments);
}

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

function resolveFileAndKey(data, baseDir) {
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

	fileKey = fileKey.replace(/^\[|\]$/g, "");
	return [targetFile, fileKey.split("][")];
}

function loadUserJSONCode(data, baseDir) {
	const [targetFile, fileKey] = resolveFileAndKey(data, baseDir);

	if (!fs.existsSync(targetFile)) {
		return { success: false, data: null };
	}

	if (fs.statSync(targetFile).size === 0) {
		return { success: true, data: null };
	}

	const fileContent = JSON.parse(fs.readFileSync(targetFile, "utf-8"));

	if (fileKey[0] === '') {
		return { success: true, data: fileContent }; // Entire file
	} else {
		return { success: true, data: fileContent[fileKey[0]] }; // Specific section
	}
}

function loadUserJSONSettings(data, baseDir) {
	const targetFile = path.join(baseDir, "settings.json");
	
	if (!fs.existsSync(targetFile)) {
		return { success: false, data: null };
	}

	if (fs.statSync(targetFile).size === 0) {
		return { success: true, data: null };
	}

	const fileContent = JSON.parse(fs.readFileSync(targetFile, "utf-8"));

	return { success: true, data: fileContent };
}

function loadJson(data) {
	if (data.type == "code") {
		const baseDir = getBaseDir([data.project_name, "sql_files"]);
		ensureDir(baseDir);

		return loadUserJSONCode(data, baseDir);
	}

	if (data.type == "settings") {
		const baseDir = getBaseDir([data.project_name]);
		ensureDir(baseDir);

		return loadUserJSONSettings(data, baseDir);
	}
}

export { loadJson };
