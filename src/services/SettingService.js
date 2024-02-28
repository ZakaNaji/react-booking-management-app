import { editResource, fetchResource } from "./restApi";

async function getSettings() {
  try {
    const data = await fetchResource("settings");

    return data[0];
  } catch (error) {
    throw new Error("Error fetching settings" + error);
  }
}

async function updateSettings(settings) {
  try {
    return editResource("settings", 1, settings);
  } catch (error) {
    throw new Error("Error updating settings" + error);
  }
}

export { getSettings, updateSettings };
