const port = 57381;
const api_url = `http://localhost:${port}/todos`;

export async function getTodos() {
	const response = await fetch(api_url);
	return await response.json();
}

export async function createTodo(item) {
	const response = await fetch(api_url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: item,
			completed: 0,
		}),
	});
	return await response.json();
}

// export async function updateTodoStatus(id, completed) {
// 	const response = await fetch(`${api_url}/completed/${id}`, {
// 		method: "PATCH",
// 		headers: { "Content-Type": "application/json" }
// 		body:
// 	})
// }
