<script>
  import characters from "./characters.json";
  import { onMount } from "svelte";
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

  let self;
  let keyword = "";
  let isSearching = false;
  let filteredChars = [];

  const { activeElement } = document;
  const { top, left, height } = activeElement.getBoundingClientRect();
  const categories = Object.keys(characters);
  const allChars = categories.map((category) => characters[category]).flat();

  function insert({ target }) {
    const { tagName } = activeElement;
    activeElement.focus();
    tagName === "INPUT" || tagName === "TEXTAREA"
      ? (activeElement.value += target.textContent)
      : (activeElement.textContent += target.textContent);
  }

  function dismiss() {
    self.remove();
  }

  function search({ key }) {
    isSearching = true;
    keyword += key;
    // filteredChars = allChars.filter(({ name }) => name.includes(keyword));
  }

  onMount(() => {
    self.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", dismiss);
    activeElement.addEventListener("keypress", search);
  });
</script>

<div
  bind:this={self}
  id="spc"
  style="top: {top + height}px; left: {left + 3}px"
>
  <p>
    Keep typing to find a character
    <button aria-label="Close" on:click={dismiss}>x</button>
  </p>
  <Tabs>
    {#each categories as category}
      <TabPanel>
        {#if isSearching}
          <ul>
            {#each filteredChars as { char }}
              <li on:click={insert}>{char}</li>
            {/each}
          </ul>
        {:else}
          <ul>
            {#each characters[category] as { char }}
              <li on:click={insert}>{char}</li>
            {/each}
          </ul>
        {/if}
      </TabPanel>
    {/each}

    <TabList>
      {#each categories as category}
        <Tab>{category}</Tab>
      {/each}
    </TabList>
  </Tabs>
</div>

<style>
  :root {
    --spacing: 0.5em;
  }

  #spc {
    z-index: 9999;
    position: absolute;
    background: #f9f9f9;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    font-size: 16px;
  }

  p {
    margin: var(--spacing);
    color: #666;
  }

  button[aria-label="Close"] {
    float: right;
    font-family: monospace;
    background: #eee;
    color: #000;
    border: none;
    padding: 0;
    margin: calc(var(--spacing) * -1 + 0.1em);
    width: 30px;
    height: 30px;
    line-height: 0;
  }

  button[aria-label="Close"]:hover {
    background: #f33333;
    color: #fff;
  }

  ul {
    width: 400px;
    height: 300px;
    padding: var(--spacing) !important;
    text-align: center;
    overflow: auto;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(12, auto);
  }

  li:hover {
    background: #eee;
    cursor: default;
  }
</style>
