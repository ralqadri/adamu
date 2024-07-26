const port = 57381;
const api = `http://localhost:${port}/todos`;

export async function getTodos() {
	const response = await fetch(api);
	return await response.json();
}
