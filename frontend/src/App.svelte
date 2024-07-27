<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import {
		getTodos,
		createTodo,
		updateTodoStatus,
		updateTodoName,
		deleteTodo,
	} from "./api";

	let todos = [];

	let new_todo = "";

	async function addLocalTodo() {
		if (new_todo.trim() === "") return;

		try {
			await createTodo(new_todo);
			new_todo = "";
			todos = await getTodos();
		} catch (err) {
			console.error(`Error adding todo: ${err}`);
		}
	}

	// LMFAO (credit: https://joyofcode.xyz/svelte-todo-app#removing-todo-items)
	async function deleteLocalTodo(id) {
		try {
			await deleteTodo(id);
			todos = todos.filter((todo) => todo.id !== id);
		} catch (err) {
			console.error(`Error deleting todo ID ${id}: ${err}`);
		}
	}

	function handleEnterKey(event, activity) {
		if (event.key === "Enter") {
			if (activity == "add") {
				addLocalTodo();
			}
			if (activity == "update") {
				// TODO: this
				updateTodoName();
			}
		}
	}

	onMount(async () => {
		todos = await getTodos();
	});
</script>

<main>
	<div class="header" transition:fade>
		<div class="title">
			<h1>To-dos</h1>
		</div>

		<div class="input">
			<div class="text-box">
				<input
					type="text"
					placeholder="add new todo..."
					bind:value={new_todo}
					on:keydown={(e) => handleEnterKey(e, "add")}
				/>
			</div>
			<!-- <div class="input-btn">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15" {...$$props}><path fill="currentColor" fill-rule="evenodd" d="M8 2.75a.5.5 0 0 0-1 0V7H2.75a.5.5 0 0 0 0 1H7v4.25a.5.5 0 0 0 1 0V8h4.25a.5.5 0 0 0 0-1H8z" clip-rule="evenodd"/></svg>
          </button>
        </div> -->
		</div>
	</div>

	<div class="list">
		<ul>
			{#each todos as todo}
				<div class="item" transition:fade>
					<!-- <div class="item-id">{todo.id}</div> -->
					<div class="item-checkbox">
						<input
							type="checkbox"
							bind:checked={todo.completed}
							on:click={() => updateTodoStatus(todo.id)}
						/>
					</div>
					<div class="item-name">
						<input
							type="text"
							class="item-name"
							bind:value={todo.name}
							on:keydown={(e) => handleEnterKey(e, "update")}
						/>
						<!-- {todo.name} -->
					</div>
					<div class="item-delete">
						<button class="item-btn" on:click={() => deleteLocalTodo(todo.id)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.5em"
								height="1.5em"
								viewBox="0 0 15 15"
								{...$$props}
								><path
									fill="#d21041"
									fill-rule="evenodd"
									d="M12.854 2.854a.5.5 0 0 0-.708-.708L7.5 6.793L2.854 2.146a.5.5 0 1 0-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 0 0 .708.708L7.5 8.207l4.646 4.647a.5.5 0 0 0 .708-.708L8.207 7.5z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
					</div>
				</div>
			{/each}
		</ul>
	</div>
</main>
