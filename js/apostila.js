const apostila = $("#flipbook").turn({
  width: 300,
  height: window.innerHeight - 60,
  acceleration: true,
  display: "single",
});

window.addEventListener("resize", () => {
  apostila.turn("size", 300, window.innerHeight - 60);
});

function highlight(e) {
  if (!e.dataset.highlighted) {
    hljs.highlightElement(e)
  }
}

next.addEventListener("click", (e) => {
  apostila.turn("next");
  highlight(e.target);
});

previous.addEventListener("click", (e) => {
  apostila.turn("previous");
  highlight(e.target);
});

summary.addEventListener("click", () => {
  apostila.turn("page", 2);
});

const element = document.body;

// Get height including padding and borders (most common "actual" height)
const actualHeight = element.offsetHeight;
console.log('Offset Height:', actualHeight);

// Get height including padding and borders, with decimal precision (useful with CSS transforms)
const preciseHeight = element.getBoundingClientRect().height;
console.log('Bounding Client Rect Height:', preciseHeight);

// Get inner height (padding only, no borders or scrollbar)
const innerHeight = element.clientHeight;
console.log('Client Height:', innerHeight);

// Get height of the entire content (including off-screen scrollable content)
const contentHeight = element.scrollHeight;
console.log('Scroll Height:', contentHeight);

