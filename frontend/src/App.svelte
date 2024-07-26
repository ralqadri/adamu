<script>
  import { onMount } from "svelte";
  import { getTodos } from "./api";

  let todos = [];

  onMount(async () => {
    todos = await getTodos();
  });
</script>

<main>
  <h1>To-do list</h1>
  <ul>
    {#each todos as todo}
      <li>{todo.name}</li>
    {/each}
  </ul>
</main>

<style>

</style>