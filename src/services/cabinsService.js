import {
  createResource,
  deleteResource,
  editResource,
  fetchResource,
} from "./restApi.js";

async function getCabins() {
  try {
    return fetchResource("cabins");
  } catch (error) {
    console.error("Error fetching cabins:", error);
    return [];
  }
}

async function deleteCabin(id) {
  try {
    return deleteResource("cabins", id);
  } catch (error) {
    console.error(`Error deleting cabin with id ${id}:`, error);
    return false;
  }
}

async function createCabin(data) {
  try {
    return createResource("cabins", data);
  } catch (error) {
    console.error("Error creating cabin:", error);
    return false;
  }
}

async function editCabin(id, cabin) {
  console.log("editing : ", cabin);
  try {
    return editResource("cabins", id, cabin);
  } catch (error) {
    console.error(`Error editing cabin with id ${cabin.id}:`, error);
    throw new Error("Error editing cabin");
  }
}

async function createEditCabin(cabin) {
  console.log("createEditCabin : ", cabin);
  if (cabin.id) {
    return editCabin(cabin.id, cabin);
  } else {
    return createCabin(cabin);
  }
}

export { getCabins, deleteCabin, createCabin, editCabin, createEditCabin };
