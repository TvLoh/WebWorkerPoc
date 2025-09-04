/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  if (data.cmd === 'sort') {
    // Demo: Sortierung in JS (funktioniert immer)
    const sorted = [...data.array].sort((a, b) => a - b);
    postMessage({ type: 'sorted', array: sorted });
  }
});