/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  if (data.cmd === 'sort') {
    // Fallback: Sortieren in JavaScript, damit der Worker läuft und der Build funktioniert.
    const sorted = [...data.array].sort((a, b) => a - b);
    postMessage({ type: 'sorted', array: sorted });
  }
});