<script>
  import { onMount } from "svelte";
  import { getTodos, createTodo, updateTodoStatus, deleteTodo } from "./api";

  let todos = [];

  // LMFAO (credit: https://joyofcode.xyz/svelte-todo-app#removing-todo-items)
  async function deleteLocalTodo(id) {
    try {
      await deleteTodo(id);
      todos = todos.filter((todo) => todo.id !== id);
    } catch (error) {
      console.error(`Error deleteing todo ID ${id}: ${error}`);
    }
  }

  onMount(async () => {
    todos = await getTodos();
  });
</script>

<main>
  <!-- TODO: I think this should just be the textbox to insert new items -->
  <div class="title">
    <h1>To-dos</h1>
  </div>

  <div class="list">
    <ul>
    {#each todos as todo}
      <div class="item">
          <!-- <div class="item-id">{todo.id}</div> -->
          <div class="item-checkbox">
            <input type="checkbox" bind:checked={todo.completed} on:click={() => updateTodoStatus(todo.id)}>
          </div>
          <div class="item-name">
            {todo.name}
          </div>
          <div class="item-delete">
            <button class="btn" on:click={() => deleteLocalTodo(todo.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15" {...$$props}><path fill="#d21041" fill-rule="evenodd" d="M12.854 2.854a.5.5 0 0 0-.708-.708L7.5 6.793L2.854 2.146a.5.5 0 1 0-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 0 0 .708.708L7.5 8.207l4.646 4.647a.5.5 0 0 0 .708-.708L8.207 7.5z" clip-rule="evenodd"/></svg>
            </button>
          </div>
        </div>
    {/each}
    </ul>
  </div>
</main>