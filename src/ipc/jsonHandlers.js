import { ipcMain } from "electron";
import { saveJson } from "../services/saveJson.js";
import { loadJson } from "../services/loadJson.js";

function registerJsonHandlers() {
    ipcMain.handle("save-json", async (event, data) => {
        try {
            return saveJson(data);
        } catch (e) {
            console.error(e);
            return { success: false, error: e };
        }
    });

    ipcMain.handle("load-json", async (event, data) => {
        try {
            return loadJson(data);
        } catch (e) {
            console.error(e);
            return { success: false, error: e };
        }
    });
}

export { registerJsonHandlers };