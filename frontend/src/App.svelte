<script>
  import { onMount } from "svelte";
  import { getTodos } from "./api";

  let todos = [];

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
            <input type="checkbox" bind:checked={todo.completed}>
          </div>
          <div class="item-name">
            {todo.name}
          </div>
        </div>
    {/each}
    </ul>
  </div>
</main>