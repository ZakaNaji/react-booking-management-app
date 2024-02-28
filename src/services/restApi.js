async function fetchResource(resource) {
  try {
    const response = await fetch("http://localhost:8080/" + resource);
    const data = await response.json();
    return data._embedded[resource];
  } catch (error) {
    console.error(`Error fetching ${resource}s:`, error);
    return [];
  }
}
async function deleteResource(resource, id) {
  try {
    const response = await fetch(`http://localhost:8080/${resource}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error(`Error deleting ${resource} with id ${id}:`, error);
    throw new Error("Error deleting resource");
  }
}

async function createResource(resource, data) {
  try {
    const response = await fetch(`http://localhost:8080/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error(`Error creating ${resource}:`, error);
    throw new Error("Error creating resource");
  }
}

async function editResource(resource, id, data) {
  try {
    const response = await fetch(`http://localhost:8080/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error(`Error editing ${resource} with id ${id}:`, error);
    throw new Error("Error editing resource");
  }
}
export { fetchResource, deleteResource, createResource, editResource };
