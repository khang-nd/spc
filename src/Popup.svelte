<script>
  import spc from "special-chars";
  import { onMount } from "svelte";
  import { Tabs, Tab, TabContent } from "svelte-materialify/dist";
  import { isFormElement } from "./utils";

  /** @type {Document} */
  export let document;
  export let id;
  export let offset;

  const { activeElement } = document;
  const allChars = Object.keys(spc)
    .map((category) => spc[category])
    .flat();

  let self;
  let characters = { ...spc, "🔎": [] };
  let categories = Object.keys(characters);
  let searchText = "";

  function insert({ target }) {
    const attribute = isFormElement(activeElement) ? "value" : "textContent";
    activeElement.focus();
    activeElement[attribute] += target.textContent;
  }

  function dismiss() {
    self.remove();
  }

  function stopPropagation(event) {
    event.stopPropagation();
  }

  onMount(() => {
    document.addEventListener("click", dismiss);
    self.addEventListener("click", stopPropagation);
    activeElement.addEventListener("click", stopPropagation);
  });

  $: if (searchText) {
    let count = 0;
    const condition = ({ name }) =>
      name.includes(searchText.toUpperCase()) && ++count <= 150;
    characters["🔎"] = allChars.filter(condition);
  } else {
    characters["🔎"] = [];
  }
</script>

<main bind:this={self} {id} style="top: {offset.y}px; left: {offset.x}px">
  <header>
    <input type="search" placeholder="Search..." bind:value={searchText} />
    <button aria-label="Close" on:click={dismiss}>✕</button>
  </header>
  <Tabs vertical value={searchText ? categories.length - 1 : 0}>
    {#each categories as category}
      <TabContent>
        <ul>
          {#each characters[category] as { name, char }}
            <li title={name} on:click={insert}>{char}</li>
          {/each}
        </ul>
      </TabContent>
    {/each}
    <div slot="tabs">
      {#each categories as category}
        <Tab>{category}</Tab>
      {/each}
    </div>
  </Tabs>
</main>

<style>
  :root {
    --spacing: 0.5em;
  }

  #spc {
    z-index: 9999;
    position: absolute;
    background: #f8f8f8;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    font-size: 16px;
    padding-bottom: var(--spacing);
  }

  header {
    display: flex;
    padding: var(--spacing);
  }

  input[type="search"] {
    outline-offset: initial;
    padding: 0.1em 0.3em;
    margin-right: var(--spacing);
    background: #fff;
    box-sizing: border-box;
    flex-grow: 2;
  }

  button[aria-label="Close"] {
    background: #eee;
    color: #000;
    border: none;
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 0;
  }

  button[aria-label="Close"]:hover {
    background: #f33333;
    color: #fff;
  }

  ul {
    width: 310px;
    height: 300px;
    margin: 0;
    padding: var(--spacing) !important;
    text-align: center;
    box-sizing: border-box;
    overflow: auto;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
  }

  li:hover {
    background: #eee;
    cursor: default;
  }

  :global(.s-window) {
    background: #fff;
  }
</style>
